import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({ auth, task }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-semibold fs-4 text-muted">
            {`Task "${task.name}"`}
          </h2>
          <Link
            href={route("task.edit", task.id)}
            className="btn btn-emerald-500"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Task "${task.name}"`}>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/animate-css/animate.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/sweetalert2/sweetalert2.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/select2/select2.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/@form-validation/form-validation.css" />

        {/* Page CSS */}
        <link rel="stylesheet" href="/assets/vendor/css/pages/page-user-view.css" />

        {/* Helpers */}
        <script src="/assets/vendor/js/helpers.js"></script>
        <script src="/assets/js/config.js"></script>
      </Head>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={task.image_path}
                    alt=""
                    className="img-fluid rounded mb-3 pt-1 mt-4"
                    style={{ height: "100px", width: "100px" }}
                  />
                  <div className="user-info">
                    <h4 className="mb-2">{task.name}</h4>
                    <span className="badge bg-label-secondary mt-1">Task</span>
                  </div>
                </div>
                <div className="d-flex justify-content-around flex-wrap mt-3 pt-3 pb-4 border-bottom">
                  <div className="d-flex align-items-start me-4 mt-3 gap-2">
                    <span className="badge bg-label-primary p-2 rounded">
                      <i className="ti ti-checkbox ti-sm"></i>
                    </span>
                    <div>
                      <p className="mb-0 fw-medium">1.23k</p>
                      <small>Tasks Done</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mt-3 gap-2">
                    <span className="badge bg-label-primary p-2 rounded">
                      <i className="ti ti-briefcase ti-sm"></i>
                    </span>
                    <div>
                      <p className="mb-0 fw-medium">568</p>
                      <small>Projects Done</small>
                    </div>
                  </div>
                </div>
                <p className="mt-4 small text-uppercase text-muted">Details</p>
                <div className="info-container">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="fw-medium me-1">Task ID:</span>
                      <span>{task.id}</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Status:</span>
                      <span className={"badge " + TASK_STATUS_CLASS_MAP[task.status]}>
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Priority:</span>
                      <span className={"badge " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Created By:</span>
                      <span>{task.createdBy.name}</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Assigned User:</span>
                      <span>{task.assignedUser.name}</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Due Date:</span>
                      <span>{task.due_date}</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Create Date:</span>
                      <span>{task.created_at}</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Updated By:</span>
                      <span>{task.updatedBy.name}</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Project:</span>
                      <Link
                        href={route("project.show", task.project.id)}
                        className="link-secondary"
                      >
                        {task.project.name}
                      </Link>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <Link
                      href={route("task.edit", task.id)}
                      className="btn btn-primary me-3"
                    >
                      Edit
                    </Link>
                    <a href="javascript:;" className="btn btn-label-danger suspend-user">Suspend</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Task Description</h5>
                <p className="card-text">{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}