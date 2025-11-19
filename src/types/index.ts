export interface User {
  id?: string;
  mobile: string;
  name: string;
  verified: boolean;
  referral_type: string;
  email?: string;
  address?: string;
  phone?: string;
  city?: string;
  state?: string;
  pincode?: string;
  occupation?: string;
  income_level?: string;
  family_size?: number;
  [key: string]: any; // Allow dynamic custom fields
}

export interface CreateUserRequest {
  mobile: string;
  name: string;
  referral_type: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
