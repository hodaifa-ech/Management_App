import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
  return (
    <html lang="en" className="light-style layout-navbar-fixed layout-menu-fixed layout-compact" dir="ltr"
      data-theme="theme-default" data-assets-path="../../assets/">
      <Head title="Profile">
        <meta charset="utf-8" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/tabler-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/core.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default.css" />
        <link rel="stylesheet" href="/assets/css/demo.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/typeahead-js/typeahead.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css" />
        <link rel="stylesheet" href="/assets/vendor/css/pages/page-profile.css" />

        <script src="/assets/js/vendor/js/helpers.js"></script>
        <script src="/assets/js/js/config.js"></script>
      </Head>
      <body className=" text-black">
        <AuthenticatedLayout
          user={auth.user}
          header={<h2 className="font-semibold text-xl leading-tight">Profile</h2>}
        >
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
              <div className=" text-black shadow sm:rounded-lg">
                <div className="user-profile-header-banner">
                  <img src="/assets/img/pages/profile-banner.png" alt="Banner image" className="rounded-top w-full" />
                </div>
                <div className="user-profile-header flex flex-col sm:flex-row text-center sm:text-left mb-4 ">
                  <div className="flex-shrink-0 mt-n2 mx-auto sm:mx-0">
                    <img
                      src={auth.user.image_path ? `/storage/${auth.user.image_path}` : 'default-avatar.png'}
                      alt="user image"
                      className="d-block h-auto ms-0 ms-sm-4  user-profile-img w-32 h-32" />
                  </div>
                  <div className="flex-grow-1 mt-3 sm:mt-5">
                    <div className="flex flex-col md:flex-row items-center md:justify-between mx-4 gap-4">
                      <div className="user-profile-info">
                        <h4 className="text-l font-bold mt-4">{auth.user.name}</h4>
                        <ul className="list-inline mb-0 flex flex-wrap justify-center sm:justify-start gap-2">
                          <li className="list-inline-item flex gap-1">
                            <i className="ti ti-color-swatch"></i> UX Designer
                          </li>
                          <li className="list-inline-item flex gap-1">
                            <i className="ti ti-map-pin"></i>Fes
                          </li>
                          <li className="list-inline-item flex gap-1">
                            <i className="ti ti-calendar"></i>{formatDate(auth.user.created_at)}
                          </li>
                        </ul>
                      </div>
                      <button className="btn btn-primary flex items-center gap-1">
                        <i className="ti ti-check me-1"></i>Connected
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8  dark:bg-black shadow sm:rounded-lg">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="max-w-xl"
                />
              </div>

              <div className="p-4 sm:p-8  dark:bg-black shadow sm:rounded-lg">
                <UpdatePasswordForm className="max-w-xl" />
              </div>

              <div className="p-4 sm:p-8  dark:bg-black shadow sm:rounded-lg">
                <DeleteUserForm className="max-w-xl" />
              </div>
            </div>
          </div>
        </AuthenticatedLayout>
      </body>
    </html>
  );
}
