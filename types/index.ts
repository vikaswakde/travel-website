export type Destination = {
  id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  created_at: string;
  updated_at: string;
  show_in_hero: boolean;
  is_active: boolean;
};
export type Gallery = {
  id: string; // UUID
  destination_name: string;
  images: string[]; // Array of image URLs
  created_at: string; // Timestamp with time zone
};
export type DiscountBanner = {
  id: string; // UUID
  image_url: string; // URL of the banner image
  title?: string; // Optional title for the banner
  link_url?: string; // Optional link for the banner
  active?: boolean; // Indicates if the banner is active
  created_at: string; // Timestamp with time zone
  updated_at: string; // Timestamp with time zone
};

export type InternationalDestination = {
  id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  show_in_hero: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image: string;
  created_at: string;
};

// export interface PopularPackage {
//   id: string;
//   name: string;
//   description: string;
//   duration: string;
//   price: number;
//   image_url: string;
//   amenities: Array<{
//     icon: string;
//     text: string;
//   }>;
//   created_at: string;
//   updated_at: string;
// }

export interface HeroImage {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
