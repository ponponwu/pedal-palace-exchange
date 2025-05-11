
export interface Bicycle {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  brand?: string;
  model?: string;
  year?: number;
  frame_size?: string;
  wheel_size?: string;
  condition?: string;
  price: number;
  location?: string;
  images?: {
    url: string;
    alt?: string;
  }[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface BicycleWithOwner extends Bicycle {
  owner?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
}
