import { z } from "zod";
const propertyAdSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(120, "Title must be at most 120 characters"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters")
    .max(2000, "Description is too long"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be positive"),
  propertyType: z.enum(["apartment", "house", "studio", "land", "office"], {
    required_error: "Property type is required",
  }),
  bedrooms: z
    .number({ invalid_type_error: "Bedrooms must be a number" })
    .int("Bedrooms must be an integer")
    .min(0, "Bedrooms cannot be negative")
    .max(20, "Bedrooms seems too high"),
  bathrooms: z
    .number({ invalid_type_error: "Bathrooms must be a number" })
    .int("Bathrooms must be an integer")
    .min(0, "Bathrooms cannot be negative")
    .max(20, "Bathrooms seems too high"),
  sizeSqm: z
    .number({ invalid_type_error: "Size must be a number" })
    .positive("Size must be positive"),
  area: z.string().min(1, "Area is required"),
  address: z.string().min(5, "Address is too short"),
  amenities: z.array(z.string()).optional(),
  contactEmail: z
    .string()
    .min(1, "Contact email is required")
    .email("Invalid email address"),
  contactPhone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long"),
});

export default propertyAdSchema;