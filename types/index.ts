export type Destination = {
  id: string
  name: string
  description: string
  type: 'international' | 'national' | 'regional'
  location: string
  images: string[]
  created_at: string
  updated_at: string
  show_in_hero: boolean;
  is_active: boolean;
}

export type Testimonial = {
  id: string
  name: string
  comment: string
  rating: number
  image: string
  created_at: string
} 

export interface PopularPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image_url: string;
  amenities: Array<{
    icon: string;
    text: string;
  }>;
  created_at: string;
  updated_at: string;
}

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