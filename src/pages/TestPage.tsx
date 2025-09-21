import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TestPage = () => {
  return (
    <div className="min-h-screen bg-red-500">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-white">Test Page</h1>
          <p className="text-white mt-4">If you can see this, the basic rendering is working.</p>
          <div className="bg-blue-500 p-4 mt-4 text-white">
            This should be a blue box
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestPage;