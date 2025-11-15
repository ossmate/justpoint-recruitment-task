"use client";

import { Movie } from "@/types/movie";
import Image from "next/image";
import { Calendar, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getTMDbImageUrl } from "@/lib/api/tmdb";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  const router = useRouter();

  useEffect(function lockBodyScroll() {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(function handleEscapeKey() {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const posterUrl = getTMDbImageUrl(movie.poster_path) ?? '';
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const handleMoreDetails = () => {
    // TODO: implement navigation to details page
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 relative w-full md:w-48 h-64 md:h-auto bg-gray-100">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 pr-8">
              {movie.title}
            </h2>

            {releaseYear && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">{releaseYear}</span>
              </div>
            )}

            {movie.overview && (
              <p className="text-gray-700 leading-relaxed mb-6">
                {movie.overview}
              </p>
            )}

            <button
              onClick={handleMoreDetails}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
