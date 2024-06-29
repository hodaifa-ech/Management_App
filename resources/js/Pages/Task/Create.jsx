import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Task
          </h2>
        </div>
      }
    >
      <Head title="Tasks">
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
                  <h5 className="mb-0">Create New Task</h5>
                  <small className="text-muted float-end">Task Details</small>
                </div>
                <div className="card-body">
                  <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                      <InputLabel htmlFor="task_project_id" value="Project" />
                      <SelectInput
                        name="project_id"
                        id="task_project_id"
                        className="form-control"
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

                    <div className="mb-3">
                      <InputLabel htmlFor="task_image_path" value="Task Image" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-image"></i></span>
                        <TextInput
                          id="task_image_path"
                          type="file"
                          name="image"
                          className="form-control"
                          onChange={(e) => setData("image", e.target.files[0])}
                        />
                      </div>
                      <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="task_name" value="Task Name" />
                      <div className="input-group input-group-merge">
                        <span id="basic-icon-default-fullname2" className="input-group-text">
                          <i className="ti ti-file"></i>
                        </span>
                        <TextInput
                          id="task_name"
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
                      <InputLabel htmlFor="task_description" value="Task Description" />
                      <TextAreaInput
                        id="task_description"
                        name="description"
                        value={data.description}
                        className="form-control"
                        onChange={(e) => setData("description", e.target.value)}
                      />
                      <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-calendar"></i></span>
                        <TextInput
                          id="task_due_date"
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
                      <InputLabel htmlFor="task_status" value="Task Status" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-flag"></i></span>
                        <SelectInput
                          name="status"
                          id="task_status"
                          className="form-control"
                          onChange={(e) => setData("status", e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </div>
                      <InputError message={errors.task_status} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="task_priority" value="Task Priority" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-flag"></i></span>
                        <SelectInput
                          name="priority"
                          id="task_priority"
                          className="form-control"
                          onChange={(e) => setData("priority", e.target.value)}
                        >
                          <option value="">Select Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </SelectInput>
                      </div>
                      <InputError message={errors.priority} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="task_assigned_user" value="Assigned User" />
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="ti ti-user"></i></span>
                        <SelectInput
                          name="assigned_user_id"
                          id="task_assigned_user"
                          className="form-control"
                          onChange={(e) => setData("assigned_user_id", e.target.value)}
                        >
                          <option value="">Select User</option>
                          {users.data.map((user) => (
                            <option value={user.id} key={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </SelectInput>
                      </div>
                      <InputError message={errors.assigned_user_id} className="mt-2" />
                    </div>

                    <div className="mt-4 text-end">
                      <Link
                        href={route("task.index")}
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
