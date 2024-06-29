import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    Role: "",
    image: null, // Add image to the form data
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", data); // Log form data to check if it's being set correctly

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("Role", data.Role);
    formData.append("image", data.image);

    post(route("user.store"), {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onSuccess: () => reset(), // Reset form on success
      onError: () => console.log("Form submission error:", errors), // Log errors if submission fails
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new User
          </h2>
        </div>
      }
    >
      <Head title="Users">
        <link rel="icon" type="image/x-icon" href="../../assets/img/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/tabler-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/core.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default.css" />
        <link rel="stylesheet" href="/assets/css/demo.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/typeahead-js/typeahead.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/flatpickr/flatpickr.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/select2/select2.css" />
        <script src="/assets/vendor/js/helpers.js"></script>
        <script src="/assets/js/config.js"></script>
      </Head>

      <div className="py-12">
        <div className="container">
          <div className="row">
            <div className="col-xl">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Create New User</h5>
                  <small className="text-muted float-end">User Details</small>
                </div>
                <div className="card-body">
                  <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                      <InputLabel htmlFor="user_name" value="User Name" />
                      <div className="input-group input-group-merge">
                        <span id="basic-icon-default-fullname2" className="input-group-text">
                          <i className="ti ti-user"></i>
                        </span>
                        <TextInput
                          id="user_name"
                          type="text"
                          name="name"
                          value={data.name}
                          className="form-control"
                          isFocused={true}
                          onChange={(e) => setData("name", e.target.value)}
                        />
                      </div>
                      <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="user_email" value="User Email" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-mail"></i></span>
                        <TextInput
                          id="user_email"
                          type="email"
                          name="email"
                          value={data.email}
                          className="form-control"
                          onChange={(e) => setData("email", e.target.value)}
                        />
                      </div>
                      <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="user_password" value="Password" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-lock"></i></span>
                        <TextInput
                          id="user_password"
                          type="password"
                          name="password"
                          value={data.password}
                          className="form-control"
                          onChange={(e) => setData("password", e.target.value)}
                        />
                      </div>
                      <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-lock"></i></span>
                        <TextInput
                          id="user_password_confirmation"
                          type="password"
                          name="password_confirmation"
                          value={data.password_confirmation}
                          className="form-control"
                          onChange={(e) => setData("password_confirmation", e.target.value)}
                        />
                      </div>
                      <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="user_role" value="Role" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-user"></i></span>
                        <select
                          id="user_role"
                          name="Role"
                          value={data.Role}
                          className="form-control"
                          onChange={(e) => setData("Role", e.target.value)}
                        >
                          <option value="">Select a Role</option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <InputError message={errors.Role} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="user_image" value="User Image" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-image"></i></span>
                        <TextInput
                          id="user_image"
                          type="file"
                          name="image"
                          className="form-control"
                          onChange={(e) => setData("image", e.target.files[0])}
                        />
                      </div>
                      <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="mt-4 text-end">
                      <Link
                        href={route("user.index")}
                        className="btn btn-secondary me-2"
                      >
                        Cancel
                      </Link>
                      <button className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
