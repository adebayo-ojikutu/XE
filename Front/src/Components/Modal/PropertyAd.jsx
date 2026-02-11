import { useState, useEffect } from "react";
import {
  AMENITIES,
  ADS_TYPES,
  INITIAL_PROPERTY_FORM,
} from "@/Constants/property";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import propertyAdSchema from "@/validations/property";
import { fetchArea as fetchAreaApi } from "@/Apis/property/area";
import { useDebounce } from "use-debounce";

function PropertyFormModal({ dialog, onClose, onSubmit, isSaving }) {
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [areaLoading, setAreaLoading] = useState(false);
  const [areaList, setAreaList] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertyAdSchema),
    defaultValues: INITIAL_PROPERTY_FORM,
  });

  const areaField = register("area");

  const setInitials = () => {
    if (dialog?.type === "edit" && dialog?.data) {
      reset({
        title: dialog.data.title ?? "",
        description: dialog.data.description ?? "",
        price: dialog.data.price ?? "",
        adsType: dialog.data.adsType ?? "Rent",
        bedrooms: dialog.data.bedrooms ?? "",
        bathrooms: dialog.data.bathrooms ?? "",
        sizeSqm: dialog.data.sizeSqm ?? "",
        area: dialog.data.area ?? "",
        placeId: dialog.data.placeId ?? "",
        amenities: Array.isArray(dialog.data.amenities)
          ? dialog.data.amenities
          : [],
      });
      return;
    }

    reset(INITIAL_PROPERTY_FORM);
  };

  useEffect(() => {
    setInitials();
  }, [dialog?.type, dialog?.data, reset]);

  const areaQuery = (watch("area") || "").trim();
  const [debouncedAreaQuery] = useDebounce(areaQuery, 400);

  const loadArea = async (query) => {
    try {
      setAreaLoading(true);
      const resp = await fetchAreaApi(query);
      setAreaList(resp?.data?.body);
    } catch (error) {
      console.error(error, "Error fetching area");
      setAreaList([]);
    } finally {
      setAreaLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedAreaQuery || debouncedAreaQuery.length < 3) {
      setAreaList([]);
      setAreaLoading(false);
      return;
    }
    loadArea(debouncedAreaQuery);
  }, [debouncedAreaQuery]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {dialog.type === "edit"
              ? "Edit property ad"
              : "New property classified"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className='max-h-[70vh] overflow-y-auto space-y-5 pr-1'>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="title">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Classified title up to 155 characters"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="adsType"
                >
                  Type<span className="text-red-500">*</span>
                </label>
                <select
                  id="adsType"
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  {...register("adsType")}
                >
                  <option value="">Select type...</option>
                  {ADS_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.adsType && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.adsType.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="bedrooms"
                >
                  Bedrooms<span className="text-red-500">*</span>
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  min={0}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  {...register("bedrooms", { valueAsNumber: true })}
                />
                {errors.bedrooms && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="bathrooms"
                >
                  Bathrooms<span className="text-red-500">*</span>
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  min={0}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  {...register("bathrooms", { valueAsNumber: true })}
                />
                {errors.bathrooms && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.bathrooms.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="price"
                >
                  Price in euros<span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Amount"
                  id="price"
                  type="number"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="sizeSqm"
                >
                  Size (sqm)<span className="text-red-500">*</span>
                </label>
                <input
                  id="sizeSqm"
                  type="number"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  {...register("sizeSqm", { valueAsNumber: true })}
                />
                {errors.sizeSqm && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.sizeSqm.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="area"
                >
                  Area<span className="text-red-500">*</span>
                </label>
                <input
                  id="area"
                  type="text"
                  placeholder="Area in the property's area"
                  autoComplete="off"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  {...areaField}
                  onChange={(event) => {
                    areaField.onChange(event);
                    setValue("placeId", "", { shouldValidate: true });
                  }}
                  onFocus={() => setAreaDropdownOpen(true)}
                  onBlur={() => {
                    setTimeout(() => setAreaDropdownOpen(false), 150);
                  }}
                />
                <input type="hidden" {...register("placeId")} />
                {areaDropdownOpen &&
                  (areaLoading || areaList.length > 0 || areaQuery) && (
                    <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border bg-white text-sm shadow-lg">
                      {areaLoading && (
                        <li className="flex items-center gap-2 px-3 py-2 text-gray-600">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                          Loading areas...
                        </li>
                      )}
                      {!areaLoading &&
                        areaList.map((area, i) => (
                          <li
                            key={i}
                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              setValue("area", area?.mainText ?? "", {
                                shouldValidate: true,
                              });
                              setValue("placeId", area?.placeId ?? "", {
                                shouldValidate: true,
                              });
                              setAreaList([]);
                              setAreaDropdownOpen(false);
                            }}
                          >
                            {area.mainText}
                          </li>
                        ))}
                      {!areaLoading &&
                        areaQuery &&
                        areaQuery.length >= 3 &&
                        areaList.length === 0 && (
                          <li className="px-3 py-2 text-gray-500">
                            No areas found
                          </li>
                        )}
                      {!areaLoading &&
                        areaQuery &&
                        !areaList.length > 0 &&
                        areaQuery.length < 3 && (
                          <li className="px-3 py-2 text-gray-500">
                            Type at least 3 characters
                          </li>
                        )}
                    </ul>
                  )}
                {(errors.area || errors.placeId) && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.area?.message || errors.placeId?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <span className="mb-1 block text-sm font-medium">Amenities</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className="inline-flex items-center text-sm"
                  >
                    <input
                      type="checkbox"
                      value={amenity}
                      className="mr-2"
                      {...register("amenities")}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
              {errors.amenities && (
                <p className="mt-1 text-xs text-red-600">
                  {String(errors.amenities.message)}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="description"
              >
                Extra Description
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="Type here"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("description")}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : dialog.type === "edit"
                  ? "Update ad"
                  : "Publish Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyFormModal;
