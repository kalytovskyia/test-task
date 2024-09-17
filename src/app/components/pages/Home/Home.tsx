"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField, renderField } from "@/lib";

export default function Home({ file }: { file: any }) {
  const formFields: FormField[] = JSON.parse(file);

  const [submittedValues, setSubmittedValues] = useState<Record<
    string,
    any
  > | null>(null);

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: Record<string, any>) => setSubmittedValues(data);

  return (
    <div className="grid gap-4 content-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {formFields.map((field, index) => renderField(field, index, control))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md col-span-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      {submittedValues && (
        <div>
          <h2>Submitted Values:</h2>
          <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
