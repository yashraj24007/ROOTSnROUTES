import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TestPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-foreground">Test Page</h1>
          <p className="text-muted-foreground mt-4">If you can see this, the basic rendering is working.</p>
          <div className="bg-primary text-primary-foreground p-4 mt-4 rounded-lg">
            This should be a themed box
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestPage;