import { API_ENDPOINTS } from "../constants";

import getApiClient, {
  setUserProfileData,
  throwError,
} from "../utilities/globals";

import {
  UserProfileRequest,
  UserProfileResponse,
} from "../models/UserProfileModel";

// Fetches the user's profile details from the server
export async function getUserProfile(
  ClientID: UserProfileRequest // Input object containing ClientID
): Promise<UserProfileResponse> {
  try {
    const response = await getApiClient().post<UserProfileResponse>(
      API_ENDPOINTS.UserProfile, // API endpoint to fetch user profile
      {}, // No body content required
      { params: ClientID } // Pass ClientID as query parameters
    );

    setUserProfileData(response.data); // Save the fetched profile data locally

    return response.data; // Return the profile data
  } catch (error) {
    throwError(error); // Handle error using a central utility
    throw error; // Re-throw for caller to catch if needed
  }
}
