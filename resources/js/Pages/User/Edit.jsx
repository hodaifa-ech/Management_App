import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, user }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: user.name || "",
    Role: user.Role || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit user "{user.name}"
          </h2>
        </div>
      }
    >
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Icons */}
        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/tabler-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" />

        {/* Core CSS */}
        <link rel="stylesheet" href="/assets/vendor/css/rtl/core.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default.css" />
        <link rel="stylesheet" href="/assets/css/demo.css" />

        {/* Vendors CSS */}
        <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/typeahead-js/typeahead.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/select2/select2.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/@form-validation/form-validation.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/animate-css/animate.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/sweetalert2/sweetalert2.css" />

        {/* Helpers */}
        <script src="/assets/vendor/js/helpers.js"></script>
        <script src="/assets/js/config.js"></script>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="card mb-4">
              <h5 className="card-header">Profile Details</h5>
              <div className="card-body">
                <div className="d-flex align-items-start align-items-sm-center gap-4">
                  {user.image_path ? (
                    <img
                      src={user.image_path}
                      alt="user-avatar"
                      className="d-block w-px-100 h-px-100 rounded"
                      id="uploadedAvatar"
                    />
                  ) : (
                    <div className="placeholder-image w-px-100 h-px-100 rounded bg-gray-200"></div>
                  )}
                  <div className="button-wrapper">
                    <label
                      htmlFor="project_image_path"
                      className="btn btn-primary me-2 mb-3"
                      tabIndex="0"
                    >
                      <span className="d-none d-sm-block">Upload new photo</span>
                      <i className="ti ti-upload d-block d-sm-none"></i>
                      <input
                        type="file"
                        id="project_image_path"
                        name="image"
                        className="account-file-input"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={(e) => setData("image", e.target.files[0])}
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-label-secondary account-image-reset mb-3"
                    >
                      <i className="ti ti-refresh-dot d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Reset</span>
                    </button>

                    <div className="text-muted">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <form
                  id="formAccountSettings"
                  method="GET"
                  onSubmit={onSubmit}
                  className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                >
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="user_name" value="User Name" />
                      <TextInput
                        id="user_name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="form-control mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="User_Role" value="User Role" />
                      <SelectInput
                        name="Role"
                        id="Role"
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("Role", e.target.value)}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </SelectInput>
                      <InputError message={errors.Role} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="user_email" value="User Email" />
                      <TextInput
                        id="user_email"
                        type="text"
                        name="email"
                        value={data.email}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("email", e.target.value)}
                      />
                      <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="user_password" value="Password" />
                      <TextInput
                        id="user_password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("password", e.target.value)}
                      />
                      <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel
                        htmlFor="user_password_confirmation"
                        value="Confirm Password"
                      />
                      <TextInput
                        id="user_password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="form-control mt-1 block w-full"
                        onChange={(e) =>
                          setData("password_confirmation", e.target.value)
                        }
                      />
                      <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={route("user.index")}
                      className="btn btn-label-secondary mr-2"
                    >
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary me-2">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
