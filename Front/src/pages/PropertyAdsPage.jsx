import { useEffect, useState } from "react";
import PropertyFormModal from "@/Components/Modal/PropertyAd";
import {
  createProperty,
  deleteProperty,
  propertyPageAll,
  updateProperty,
} from "@/Apis/property/propertyAds";

const getPropertyId = (property) => String(property?._id || property?.id || "");

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  return Number(value).toLocaleString();
};

function PropertyAdsPage() {
  const [properties, setProperties] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialog, setDialog] = useState({
    open: false,
    type: null,
    data: null,
  });

  const fetchProperties = async () => {
    try {
      setIsLoadingList(true);
      setErrorMessage(null);
      const resp = await propertyPageAll();
      setProperties(resp?.data?.body);
    } catch (error) {
      setErrorMessage("Error Fetching property data");
      console.error(error, "error fetching data");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const updateDialog = (open, type, data) => {
    setDialog({
      open,
      type,
      data,
    });
  };

  const handleSaveProperty = async (formValues) => {
    try {
      setIsSaving(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const propertyId = getPropertyId(dialog.data);
      await updateProperty(formValues, propertyId);

      await fetchProperties();
      setSuccessMessage(
        dialog.type === "edit"
          ? "Property ad updated successfully."
          : "Property ad created successfully.",
      );
      updateDialog(false, null, null);
    } catch (error) {
      setSuccessMessage(
        dialog.type === "edit"
          ? "Failed to update property ad."
          : "Failed to create property ad.",
      );
      updateDialog(false, null, null);
      console.error(error, "Error saving property");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateProperty = async (formValues) => {
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await createProperty(formValues);
      await fetchProperties();
      setSuccessMessage("Property ad created successfully.");
      updateDialog(false, null, null);
    } catch (error) {
      setSuccessMessage("Failed to create property ad.");
      updateDialog(false, null, null);
      console.error(error, "Error saving property");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProperty = async (property) => {
    const propertyId = getPropertyId(property);
    if (!propertyId) return;

    const confirmed = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmed) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteProperty(propertyId);
      await fetchProperties();
      setSuccessMessage("Property ad deleted successfully.");
    } catch (error) {
      setErrorMessage("Failed to delete property ad.");
      console.error(error, "Error deleting property");
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Property ads</h1>
          <p className="text-sm text-gray-600">
            Create, edit, and delete your property ads.
          </p>
        </div>

        <button
          type="button"
          onClick={() => updateDialog(true, "create", null)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create new property ad
        </button>
      </div>
      {errorMessage && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          {successMessage}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Price
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Beds/Baths
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Area
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {isLoadingList ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                  Loading properties...
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                  No property ads found.
                </td>
              </tr>
            ) : (
              properties.map((property) => {
                const propertyId = getPropertyId(property);
                return (
                  <tr key={propertyId}>
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-gray-900">
                        {property.title || "-"}
                      </p>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {property.adsType || "-"}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      EUR {formatNumber(property.price)}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {formatNumber(property.bedrooms)} /{" "}
                      {formatNumber(property.bathrooms)}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {property.area || "-"}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateDialog(true, "edit", property)}
                          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProperty(property)}
                          className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {dialog.open && (dialog.type === "create" || dialog.type === "edit") && (
        <PropertyFormModal
          dialog={dialog}
          onClose={() => updateDialog(false, null, null)}
          onSubmit={
            dialog.type === "edit" ? handleSaveProperty : handleCreateProperty
          }
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

export default PropertyAdsPage;
