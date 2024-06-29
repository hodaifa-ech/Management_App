import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Project
          </h2>
        </div>
      }
    >
      <Head title="Projects">
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
                  <h5 className="mb-0">Create New Project</h5>
                  <small className="text-muted float-end">Project Details</small>
                </div>
                <div className="card-body">
                  <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                      <InputLabel htmlFor="project_image_path" value="Project Image" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-image"></i></span>
                        <TextInput
                          id="project_image_path"
                          type="file"
                          name="image"
                          className="form-control"
                          onChange={(e) => setData("image", e.target.files[0])}
                        />
                      </div>
                      <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="project_name" value="Project Name" />
                      <div className="input-group input-group-merge">
                        <span id="basic-icon-default-fullname2" className="input-group-text">
                          <i className="ti ti-file"></i>
                        </span>
                        <TextInput
                          id="project_name"
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
                      <InputLabel htmlFor="project_description" value="Project Description" />
                      <TextAreaInput
                        id="project_description"
                        name="description"
                        value={data.description}
                        className="form-control"
                        onChange={(e) => setData("description", e.target.value)}
                      />
                      <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-calendar"></i></span>
                        <TextInput
                          id="project_due_date"
                          type="date"
                          name="due_date"
                          value={data.due_date}
                          className="form-control"
                          onChange={(e) => setData("due_date", e.target.value)}
                        />
                      </div>
                      <InputError message={errors.due_date} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="project_status" value="Project Status" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-flag"></i></span>
                        <SelectInput
                          name="status"
                          id="project_status"
                          className="form-control"
                          onChange={(e) => setData("status", e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </div>
                      <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mt-4 text-end">
                      <Link
                        href={route("project.index")}
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
