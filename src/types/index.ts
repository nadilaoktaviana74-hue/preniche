export type TransactionType = 'FOR_SALE' | 'FOR_RENT' | 'FREE';
export type RentalPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SEMESTER';
export type ItemCondition = 'NEW' | 'LIKE_NEW' | 'LIGHTLY_USED' | 'WELL_USED';
export type ListingStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  campusName: string;
  faculty?: string;
  major?: string;
  batchYear?: number;
  avatarUrl: string;
  kostArea: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count?: number;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  transactionType: TransactionType;
  rentalPeriod?: RentalPeriod;
  condition: ItemCondition;
  status: ListingStatus;
  images: string[];
  campusName: string;
  kostArea: string;
  preferredMeetingPoint?: string;
  courseName?: string;
  courseCode?: string;
  lecturerName?: string;
  sellerId: string;
  seller: UserProfile;
  categoryId: string;
  categoryName: string;
  viewCount: number;
  createdAt: string;
}

export interface SafeMeetingPoint {
  id: string;
  campusName: string;
  name: string;
  landmark: string;
  notes?: string;
}

export interface CODAppointmentRequest {
  productId: string;
  meetingPoint: string;
  scheduledDate: string;
  scheduledTime: string;
  notes?: string;
}
