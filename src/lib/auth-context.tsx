"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types";
import { MOCK_USERS } from "@/data/mockData";

export const UNTAG_CAMPUS_NAME = "Universitas 17 Agustus 1945 Surabaya";

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    name?: string;
    password?: string;
    kostArea?: string;
    faculty?: string;
    major?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  verifyCampusEmail: (campusEmail: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "preniche_current_user";
const AUTH_ACTIVE_KEY = "preniche_auth_active";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage - only if explicitly authenticated session is active
  useEffect(() => {
    try {
      const authActive = localStorage.getItem(AUTH_ACTIVE_KEY);
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (authActive === "true" && savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to read user from localStorage", e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(AUTH_ACTIVE_KEY, "true");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(AUTH_ACTIVE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: "Email wajib diisi." };
    }

    // Check if matching mock user
    const matched = Object.values(MOCK_USERS).find(
      (u) => u.email.toLowerCase() === trimmedEmail || u.campusEmail?.toLowerCase() === trimmedEmail
    );

    if (matched) {
      saveUser(matched);
      return { success: true };
    }

    // If new email, create a new user profile
    const nameFromEmail = trimmedEmail.split("@")[0].replace(/[._]/g, " ");
    const formattedName = nameFromEmail
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: formattedName || "Pengguna Preniche",
      email: trimmedEmail,
      campusName: UNTAG_CAMPUS_NAME,
      kostArea: "Nginden Semolo",
      rating: 5.0,
      reviewCount: 0,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}`,
      isVerifiedStudent: false,
      isVerified: false,
    };

    saveUser(newUser);
    return { success: true };
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    // Simulated Google OAuth login with personal Gmail
    const googleUser: UserProfile = {
      id: `usr_google_${Date.now()}`,
      name: "Budi Santoso",
      email: "budi.santoso@gmail.com",
      campusName: UNTAG_CAMPUS_NAME,
      faculty: "Fakultas Teknik",
      major: "Teknik Informatika",
      batchYear: 2023,
      kostArea: "Semolowaru Tengah",
      rating: 5.0,
      reviewCount: 0,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      isVerifiedStudent: false,
      isVerified: false,
    };

    saveUser(googleUser);
    return { success: true };
  };

  const register = async (data: {
    email: string;
    name?: string;
    password?: string;
    kostArea?: string;
    faculty?: string;
    major?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = data.email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: "Email wajib diisi." };
    }

    const derivedName =
      (data.name && data.name.trim()) ||
      trimmedEmail
        .split("@")[0]
        .replace(/[._]/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") ||
      "Pengguna Preniche";

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: derivedName,
      email: trimmedEmail,
      campusName: UNTAG_CAMPUS_NAME,
      faculty: data.faculty || "Fakultas Teknik",
      major: data.major || "Teknik Informatika",
      kostArea: data.kostArea || "Sekitar Untag Semolowaru",
      rating: 5.0,
      reviewCount: 0,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}`,
      isVerifiedStudent: false,
      isVerified: false,
    };

    saveUser(newUser);
    return { success: true };
  };

  const logout = () => {
    saveUser(null);
  };

  const verifyCampusEmail = async (campusEmail: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "Silakan login terlebih dahulu." };
    }

    const emailTrimmed = campusEmail.trim().toLowerCase();
    const updatedUser: UserProfile = {
      ...user,
      campusEmail: emailTrimmed,
    };

    saveUser(updatedUser);
    return { success: true };
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        verifyCampusEmail,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
