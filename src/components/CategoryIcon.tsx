import React from "react";
import {
  BookOpen,
  Home,
  FlaskConical,
  Laptop,
  Shirt,
  Bike,
  Package,
} from "lucide-react";

interface CategoryIconProps {
  iconName?: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  className = "w-5 h-5",
}) => {
  switch (iconName) {
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Home":
      return <Home className={className} />;
    case "FlaskConical":
      return <FlaskConical className={className} />;
    case "Laptop":
      return <Laptop className={className} />;
    case "Shirt":
      return <Shirt className={className} />;
    case "Bike":
      return <Bike className={className} />;
    default:
      return <Package className={className} />;
  }
};
