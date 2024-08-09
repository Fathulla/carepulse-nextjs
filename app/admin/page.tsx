import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";


const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="logo"
            width={162}
            height={32}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type={"appointments"}
            icon="/assets/icons/appointments.svg"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
          />
          <StatCard
            type={"pending"}
            icon="/assets/icons/pending.svg"
            count={appointments.pendingCount}
            label="Pending appointments"
          />
          <StatCard
            type={"cancelled"}
            icon="/assets/icons/cancelled.svg"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
          />
        </section>

        <DataTable data={appointments.documents} columns={columns} />
      </main>
    </div>
  );
};

export default Admin;
