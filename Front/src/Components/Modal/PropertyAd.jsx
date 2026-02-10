import { useState, useEffect } from "react";
import { CITY_OPTIONS, AMENITIES, PROPERTY_TYPES } from "../../static/Lists";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import propertyAdSchema from "../../validations/property";
import { fetchArea as fetchAreaApi } from "../../Apis/property/area";

const EMPTY_PROPERTY_FORM = {
  title: "",
  description: "",
  price: "",
  propertyType: "apartment",
  bedrooms: "",
  bathrooms: "",
  sizeSqm: "",
  area: "",
  address: "",
  amenities: [],
  contactEmail: "",
  contactPhone: "",
};
function PropertyFormModal({ dialog, onClose, onSubmit, isSaving }) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
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
    defaultValues: EMPTY_PROPERTY_FORM,
  });

  const setInitials = () => {
    if (dialog?.type === "edit" && dialog?.data) {
      reset({
        title: dialog.data.title ?? "",
        description: dialog.data.description ?? "",
        price: dialog.data.price ?? "",
        propertyType: dialog.data.propertyType ?? "apartment",
        bedrooms: dialog.data.bedrooms ?? "",
        bathrooms: dialog.data.bathrooms ?? "",
        sizeSqm: dialog.data.sizeSqm ?? "",
        area: dialog.data.area ?? "",
        address: dialog.data.address ?? "",
        amenities: Array.isArray(dialog.data.amenities)
          ? dialog.data.amenities
          : [],
        contactEmail: dialog.data.contactEmail ?? "",
        contactPhone: dialog.data.contactPhone ?? "",
      });
      return;
    }

    reset(EMPTY_PROPERTY_FORM);
  };

  useEffect(() => {
    setInitials();
  }, [dialog?.type, dialog?.data, reset]);

  const areaQuery = watch("area") || "";

  const loadArea = async (query) => {
    try {
      setAreaLoading(true);
      const resp = await fetchAreaApi(query);
      const list = Array.isArray(resp?.data)
        ? resp.data
        : Array.isArray(resp?.data?.body)
          ? resp.data.body
          : [];
      setAreaList(list);
    } catch (error) {
      console.error(error, "Error fetching area");
      setAreaList([]);
    } finally {
      setAreaLoading(false);
    }
  };

  useEffect(() => {
    if (!areaQuery.trim()) {
      setAreaList(CITY_OPTIONS.slice(0, 5));
      setAreaLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      loadArea(areaQuery.trim());
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [areaQuery]);

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
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="title">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Bright 2-bedroom apartment near center"
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
                htmlFor="propertyType"
              >
                Type<span className="text-red-500">*</span>
              </label>
              <select
                id="propertyType"
                className="w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("propertyType")}
              >
                <option value="">Select type...</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.propertyType.message}
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
              <label className="mb-1 block text-sm font-medium" htmlFor="price">
                Price in euros<span className="text-red-500">*</span>
              </label>
              <input
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
              <label className="mb-1 block text-sm font-medium" htmlFor="area">
                Area<span className="text-red-500">*</span>
              </label>
              <input
                id="area"
                type="text"
                autoComplete="off"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("area")}
                onFocus={() => setCityDropdownOpen(true)}
                onBlur={() => {
                  setTimeout(() => setCityDropdownOpen(false), 150);
                }}
              />
              {cityDropdownOpen && areaList.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border bg-white text-sm shadow-lg">
                  {areaList.map((area, i) => (
                    <li
                      key={i}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setValue("area", area.mainText, {
                          shouldValidate: true,
                        });
                        setCityDropdownOpen(false);
                      }}
                    >
                      {area.mainText}
                    </li>
                  ))}
                </ul>
              )}
              {errors.area && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.area.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="address"
              >
                Address<span className="text-red-500">*</span>
              </label>
              <input
                id="address"
                type="text"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("address")}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.address.message}
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="contactEmail"
              >
                Contact email<span className="text-red-500">*</span>
              </label>
              <input
                id="contactEmail"
                type="email"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("contactEmail")}
              />
              {errors.contactEmail && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="contactPhone"
              >
                Contact phone<span className="text-red-500">*</span>
              </label>
              <input
                id="contactPhone"
                type="tel"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                {...register("contactPhone")}
              />
              {errors.contactPhone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.contactPhone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="description"
            >
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Describe the property, area, condition, etc."
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
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
                  : "Publish property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyFormModal;
