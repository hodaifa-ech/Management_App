import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, task, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: task.name || "",
    status: task.status || "",
    description: task.description || "",
    due_date: task.due_date || "",
    project_id: task.project_id || "",
    priority: task.priority || "",
    assigned_user_id: task.assigned_user_id || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("task.update", task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit task "{task.name}"
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
              <h5 className="card-header">Task Details</h5>
              <div className="card-body">
                {task.image_path && (
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img src={task.image_path} className="d-block w-px-100 h-px-100 rounded" />
                    <div className="button-wrapper">
                      <label htmlFor="task_image_path" className="btn btn-primary me-2 mb-3">
                        <span className="d-none d-sm-block">Change new photo</span>
                        <i className="ti ti-upload d-block d-sm-none"></i>
                        <input
                          type="file"
                          id="task_image_path"
                          name="image"
                          className="account-file-input"
                          hidden
                          onChange={(e) => setData("image", e.target.files[0])}
                        />
                      </label>
                      <button type="button" className="btn btn-label-secondary account-image-reset mb-3">
                        <i className="ti ti-refresh-dot d-block d-sm-none"></i>
                        <span className="d-none d-sm-block">Reset</span>
                      </button>
                      <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                )}
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <form
                  id="formTaskSettings"
                  method="POST"
                  onSubmit={onSubmit}
                  className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                >
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="task_project_id" value="Project" />
                      <SelectInput
                        name="project_id"
                        id="task_project_id"
                        value={data.project_id}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("project_id", e.target.value)}
                      >
                        <option value="">Select Project</option>
                        {projects.data.map((project) => (
                          <option value={project.id} key={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </SelectInput>
                      <InputError message={errors.project_id} className="mt-2" />
                    </div>

                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="task_name" value="Task Name" />
                      <TextInput
                        id="task_name"
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
                      <InputLabel htmlFor="task_description" value="Task Description" />
                      <TextAreaInput
                        id="task_description"
                        name="description"
                        value={data.description}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("description", e.target.value)}
                      />
                      <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                      <TextInput
                        id="task_due_date"
                        type="date"
                        name="due_date"
                        value={data.due_date}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("due_date", e.target.value)}
                      />
                      <InputError message={errors.due_date} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="task_status" value="Task Status" />
                      <SelectInput
                        name="status"
                        id="task_status"
                        value={data.status}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("status", e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                      <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="task_priority" value="Task Priority" />
                      <SelectInput
                        name="priority"
                        id="task_priority"
                        value={data.priority}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("priority", e.target.value)}
                      >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </SelectInput>
                      <InputError message={errors.priority} className="mt-2" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <InputLabel htmlFor="task_assigned_user_id" value="Assigned User" />
                      <SelectInput
                        name="assigned_user_id"
                        id="task_assigned_user_id"
                        value={data.assigned_user_id}
                        className="form-control mt-1 block w-full"
                        onChange={(e) => setData("assigned_user_id", e.target.value)}
                      >
                        <option value="">Select User</option>
                        {users.data.map((user) => (
                          <option value={user.id} key={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </SelectInput>
                      <InputError message={errors.assigned_user_id} className="mt-2" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={route("task.index")}
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
