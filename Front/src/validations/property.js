import { z } from "zod";

const propertyAdSchema = z.object({
  title: z.string().min(1, "Title is required").max(155, "Title must be at most 155 characters"),
  price: z.preprocess(
    (v) => (Number.isNaN(v) ? undefined : v),
    z
      .number({
        invalid_type_error: "Price must be a number",
      })
      .optional()
      .refine((v) => v !== undefined, { message: "Price is required" }),
  ),
  adsType: z.enum(["Rent", "Buy", "Exchange", "Donation"], {
    required_error: "Property type is required",
  }),
  bedrooms: z.preprocess(
    (v) => (Number.isNaN(v) ? undefined : v),
    z
      .number({
        invalid_type_error: "Bedrooms must be a number",
      })
      .optional()
      .refine((v) => v !== undefined, { message: "Bedrooms is required" }),
  ),
  bathrooms: z.preprocess(
    (v) => (Number.isNaN(v) ? undefined : v),
    z
      .number({
        invalid_type_error: "Bathrooms must be a number",
      })
      .optional()
      .refine((v) => v !== undefined, { message: "Bathrooms is required" }),
  ),
  sizeSqm: z.preprocess(
    (v) => (Number.isNaN(v) ? undefined : v),
    z
      .number({
        invalid_type_error: "Size must be a number",
      })
      .optional()
      .refine((v) => v !== undefined, { message: "Size is required" }),
  ),
  area: z.string().min(1, "Area is required"),
  placeId: z.string().min(1, "Please select an area from suggestions"),
  amenities: z.array(z.string()).optional(),
});

export default propertyAdSchema;
