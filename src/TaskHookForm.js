import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  function mySubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    toast.success(data.title + " başarıyla eklendi");
    reset({
      title: "",
      description: "",
      deadline: "",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="pt-4">
        <label className="text-slate font-bold pt-5" htmlFor="title">
          Başlık
        </label>
        <input
          className="block w-full border border-gray-600 p-2 text-sm leading-6 rounded"
          {...register("title", { required: "Task başlığı yazmalısınız" })}
          id="title"
          name="title"
          type="text"
        />
        {errors.title && (
          <p className=" text-xs pt-1.4 text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="pt-4">
        <label className="text-slate font-bold pt-5" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="block w-full border border-gray-400 p-2 text-sm leading-6 rounded"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter içermelidir",
            },
          })}
          rows="3"
          id="description"
          name="description"
        ></textarea>
        {errors.description && (
          <p className=" text-xs pt-1.4 text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <label className="text-center font-bold pl-20">Kişiler</label>
        <div>
          {kisiler.map((p) => (
            <label
              className="text-base pt-1.5 pl-2 pb-2 pr-1 rounded border border-solid border-gray-400 mr-2 mb-2 inline-flex items-center cursor-pointer"
              key={p}
            >
              <input
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçin",
                  validate: {
                    maxKisi: (value) =>
                      value.length < 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
                type="checkbox"
                name="people"
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="text-xs pt-1.4 text-red-600">{errors.people.message}</p>
        )}
      </div>

      <div className="pt-4">
        <label className="text-medium font-bold pl-20" htmlFor="deadline">
          Son teslim
        </label>
        <input
          className="input-text"
          {...register("deadline", {
            required: "Son teslim tarihi seçmelisiniz",
          })}
          id="deadline"
          name="deadline"
          type="date"
          min="2023-01-25"
        />
        {errors.deadline && (
          <p className=" text-xs pt-1 text-red-600">
            {errors.deadline.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
