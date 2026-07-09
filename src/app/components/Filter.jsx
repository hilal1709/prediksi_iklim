"use client";

import Chevron from "../../../public/icons/Chevron";
import { useEffect, useState, useRef } from "react";
import { kabupatenData } from "../lib/dataDummy";

export default function FilterSection({
  filterData,
  onMethodSelect,
  onProvinceSelect,
  onRegencySelect,
  onClimateVariableSelect,
  onPeriodSelect,
  onResolutionSelect,
  selectedProvince,
  setOpen,
}) {
  const placeholders = {
    "Variabel Iklim": "Pilih Variabel",
    "Periode Waktu": "Pilih Periode",
    Wilayah: "Pilih Provinsi",
    Kabupaten: "Pilih Kabupaten",
    "Model Prediksi": "Pilih Model",
    Resolusi: "Pilih Resolusi",
  };

  const [selections, setSelections] = useState({
    "Variabel Iklim": "Suhu",
    "Periode Waktu": "2000-2010",
    Wilayah: "Jawa Timur",
    Kabupaten: "Surabaya",
    "Model Prediksi": "LSTM with Bias Correction",
    Resolusi: "1km",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [kabupatenOptions, setKabupatenOptions] = useState([]);

  // Set default values on mount
  useEffect(() => {
    onClimateVariableSelect("Suhu");
    onPeriodSelect("2000-2010");
    onProvinceSelect("Jawa Timur");
    onRegencySelect("Surabaya");
    onMethodSelect("LSTM with Bias Correction");
    onResolutionSelect("1km");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update kabupaten options based on selected province
  useEffect(() => {
    const currentProvince = selections.Wilayah;
    
    if (currentProvince && kabupatenData[currentProvince]) {
      setKabupatenOptions(kabupatenData[currentProvince]);
    } else {
      setKabupatenOptions([]);
    }
  }, [selections.Wilayah]);

  const handleSelect = (label, value) => {
    setOpenDropdown(null);

    if (label === "Variabel Iklim") {
      setSelections((prev) => ({ ...prev, [label]: value }));
      onClimateVariableSelect(value);
    }

    if (label === "Model Prediksi") {
      setSelections((prev) => ({ ...prev, [label]: value }));
      onMethodSelect(value);
    }

    if (label === "Wilayah") {
      // Reset kabupaten FIRST, then update province
      setSelections((prev) => ({
        ...prev,
        Wilayah: value,
        Kabupaten: placeholders["Kabupaten"], // Reset kabupaten immediately
      }));
      onProvinceSelect(value);
      onRegencySelect(null); // Clear regency selection
    }

    if (label === "Kabupaten") {
      setSelections((prev) => ({ ...prev, [label]: value }));
      onRegencySelect(value);
    }

    if (label === "Periode Waktu") {
      setSelections((prev) => ({ ...prev, [label]: value }));
      onPeriodSelect(value);
    }

    if (label === "Resolusi") {
      setSelections((prev) => ({ ...prev, [label]: value }));
      onResolutionSelect(value);
    }
  };

  const handleResetKabupaten = () => {
    setSelections((prev) => ({
      ...prev,
      Kabupaten: placeholders["Kabupaten"],
    }));
    onRegencySelect(null);
  };

  const dynamicFilterData = {
    ...filterData,
    Kabupaten: kabupatenOptions.length
      ? kabupatenOptions
      : ["Pilih Provinsi terlebih dahulu"],
  };

  // Determine which dropdowns need search
  const getDropdownConfig = (label) => {
    // Small dropdowns - untuk Model Prediksi (hanya 2 opsi)
    if (label === "Model Prediksi") {
      return {
        hasSearch: false,
        limit: 10,
        size: "sm",
      };
    }

    // Medium dropdowns (md) - untuk Suhu, Periode Waktu, dan Resolusi
    if (
      label === "Variabel Iklim" ||
      label === "Periode Waktu" ||
      label === "Resolusi"
    ) {
      return {
        hasSearch: false,
        limit: 10,
        size: "md",
      };
    }

    // Large dropdowns (lg) - untuk yang lainnya
    return {
      hasSearch: label === "Wilayah" || label === "Kabupaten",
      limit: 12,
      size: "lg",
    };
  };

  return (
    <section className="absolute top-0 left-0 min-h-screen w-full flex justify-center items-center bg-black/60 z-[999]">
      <div className="max-w-7xl p-4 md:p-6 lg:p-8 rounded-xl bg-gray-200 relative">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold md:text-lg lg:text-xl">Filter</h2>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-xl bg-gray-300 hover:bg-red-600 text-gray-600 hover:text-gray-50 font-semibold text-sm transition-colors cursor-pointer"
            title="Reset Kabupaten"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
          {Object.keys(dynamicFilterData).map((label) => (
            <Dropdown
              key={label}
              label={label}
              selected={selections[label]}
              options={dynamicFilterData[label]}
              open={openDropdown === label}
              setOpen={(isOpen) => setOpenDropdown(isOpen ? label : null)}
              onSelect={(value) => handleSelect(label, value)}
              placeholder={placeholders[label]}
              showReset={
                label === "Kabupaten" &&
                selections[label] !== placeholders["Kabupaten"] &&
                kabupatenOptions.length > 0
              }
              onReset={label === "Kabupaten" ? handleResetKabupaten : null}
              config={getDropdownConfig(label)}
            />
          ))}
        </div>
        
        {/* Save Button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium text-sm transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              // Save filter selections
              console.log("Filter saved:", selections);
              // Close filter
              setOpen(false);
            }}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-md"
          >
            Simpan Filter
          </button>
        </div>
      </div>
    </section>
  );
}

function Dropdown({
  label,
  selected,
  options,
  open,
  setOpen,
  onSelect,
  placeholder,
  showReset,
  onReset,
  config,
}) {
  const isPlaceholder = selected === placeholder;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchInputRef = useRef(null);

  // Debounce search query with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset search when dropdown closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setDebouncedQuery("");
    } else if (open && config.hasSearch && searchInputRef.current) {
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open, config.hasSearch]);

  // Filter options based on search query
  const filteredOptions =
    config.hasSearch && debouncedQuery
      ? options.filter((item) =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      : options;

  // Limit displayed options
  const displayedOptions = config.hasSearch
    ? filteredOptions.slice(0, config.limit)
    : filteredOptions;

  const hasMoreResults = filteredOptions.length > displayedOptions.length;

  return (
    <div className="relative lg:min-w-md">
      <h2 className="text-gray-500 text-sm font-medium">{label}</h2>

      {/* Trigger Button */}
      <div className="flex items-center gap-2 mt-2">
        <div
          className={`flex justify-between items-center w-full gap-2 cursor-pointer px-4 py-3 rounded-xl bg-white transition-colors text-sm `}
          onClick={() => setOpen(!open)}
        >
          <p className={isPlaceholder ? "text-gray-400" : "text-gray-700"}>
            {selected}
          </p>
          <Chevron
            className={`w-4 h-4 text-gray-500 transition-transform ${
              open ? "-rotate-90" : "rotate-90"
            }`}
          />
        </div>

        {/* Reset Button for Kabupaten */}
        {showReset && (
          <button
            onClick={onReset}
            className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm transition-colors"
            title="Reset Kabupaten"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute p-1 z-[999] mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-[300px] overflow-hidden flex flex-col">
          {/* Search Input */}
          {config.hasSearch && (
            <div className="p-2 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto max-h-[200px]">
            {displayedOptions.length > 0 ? (
              <>
                {displayedOptions.map((item, index) => {
                  const isDisabled = item === "Pilih Provinsi terlebih dahulu";
                  return (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                        isDisabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => {
                        if (!isDisabled) {
                          onSelect(item);
                        }
                      }}
                      disabled={isDisabled}
                    >
                      {item}
                    </button>
                  );
                })}
                {hasMoreResults && (
                  <div className="px-4 py-2 text-xs text-gray-500 italic border-t border-gray-100">
                    +{filteredOptions.length - displayedOptions.length}{" "}
                    lainnya...
                  </div>
                )}
              </>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400 text-center">
                Tidak ada hasil
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
