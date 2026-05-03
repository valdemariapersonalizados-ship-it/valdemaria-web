import { CourseList } from "@/components/courses/course-list";
import { Header } from "@/components/layout/header";

export default function CursosPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-4 text-3xl font-bold">Cursos digitales</h1>
        <CourseList />
      </main>
    </>
  );
}
