import { FetchFeedFilterOptions } from "@/modules/feed/types";
import { useForm, useFormContext } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

interface SearhFormData {
  searchQuery: string;
}
export default function SearchPanel() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const internalMethods = useForm<SearhFormData>();
  const methods = useFormContext<FetchFeedFilterOptions>();

  const handleSubmit = ({ searchQuery }: SearhFormData) => {
    methods.setValue("searchQuery", searchQuery);
    navigate(`${pathname}?searchQuery=${searchQuery}`);
  };

  return (
    <form onSubmit={internalMethods.handleSubmit(handleSubmit)} className="w-full flex justify-end mb-6">
      <input
        className="px-6 py-2 rounded-3xl w-full max-w-120 border border-gray-400"
        {...internalMethods.register("searchQuery")}
      />
    </form>
  );
}
