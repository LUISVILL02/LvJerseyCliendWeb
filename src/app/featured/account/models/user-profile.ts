export interface UserProfile {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  address: UserAddress;
}

export interface UserAddress {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  defaultAddress: string;
}

export interface UserProfileUpdate {
  fullName: string;
  address: UserAddress;
}
