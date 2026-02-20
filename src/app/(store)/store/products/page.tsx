"use client";

import { useState } from "react";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import ProductsTable from "@/lib/components/Pages/Store/Products/ProductsTable";
import { URLs } from "@/lib/constants/urls";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
  Progress,
} from "@nextui-org/react";
import Link from "next/link";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner"; // or your toast library
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { API_PRODUCT } from "@/lib/services/store/product_service";
import { API_CATEGORY } from "@/lib/services/store/category_service";
import { API_BRANCH } from "@/lib/services/store/branch_service";
import { Product } from "@/lib/types/store/product";

interface UploadResult {
  created: number;
  errors?: Array<{
    row: number;
    message: string;
  }>;
}

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ];

      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Please select a valid Excel or CSV file");
        setFile(null);
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const id = "product-bulk-upload";
    toast.loading("Uploading products...", { id });

    try {
      // Simulate progress for better UX (optional)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await API_PRODUCT.bulkCreateProducts(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setResult(response.data);

      toast.success(`${response.data.created} products created successfully!`, {
        id,
      });

      if (response.data.errors && response.data.errors.length > 0) {
        toast.warning(`${response.data.errors.length} rows had errors`);
      }

      setFile(null);

      // Better alternative to window.location.reload()
      // Assuming you have a way to refresh the table data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };
  const downloadTemplate = () => {
    const templateData = [
      [
        "name",
        "description",
        "notes",
        "price",
        "category",
        "branch",
        "image",
        "status",
      ],
      [
        "Sample Product 1",
        "Product description",
        "Water proof",
        "30",
        "Electronics",
        "Tripoli",
        "https://example.com/image.jpg",
        "active",
      ],
      [
        "Sample Product 2",
        "Another description",
        "Original",
        "29.99",
        "Clothing",
        "Beirut",
        "",
        "active",
      ],
    ];

    const csvContent = templateData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(
      "Template downloaded. Categories will be auto-created if they don't exist."
    );
  };

  const exportProducts = async (products: Product[]) => {
    if (products.length === 0) {
      toast.error("No products to export");
      return;
    }

    const exportId = "export-products";
    toast.loading("Preparing export...", { id: exportId });

    try {
      // Fetch categories and branches to map IDs to names
      const [categoriesRes, branchesRes] = await Promise.all([
        API_CATEGORY.getAllCategories("?page=1&limit=10000"),
        API_BRANCH.getAllBranches("?page=1&limit=10000"),
      ]);

      // Create lookup maps
      const categoryMap = new Map(
        categoriesRes.data.map((cat) => [cat._id, cat.name])
      );
      const branchMap = new Map(
        branchesRes.data.map((branch) => [branch._id, branch.name])
      );

      // Create CSV header with ID first
      const headers = ["id", "name", "category", "price", "branch", "description", "notes", "image", "status"];

      // Debug: Log first product to check structure
      if (products.length > 0) {
        console.log("First product sample:", products[0]);
      }

      // Convert products to CSV rows
      const rows = products.map((product) => {
        // Map category IDs to names
        const categoryNames = Array.isArray(product.category)
          ? product.category
              .map((id: string) => categoryMap.get(id) || id)
              .join(", ")
          : "";

        // Map branch IDs to names
        const branchNames = Array.isArray(product.branch)
          ? product.branch
              .map((id: string) => branchMap.get(id) || id)
              .join(", ")
          : "";

        const row = [
          product._id || "",
          product.name || "",
          categoryNames,
          product.price?.toString() || "",
          branchNames,
          product.description || "",
          product.notes || "",
          product.images?.length > 0 ? product.images[0] : "",
          product.is_active ? "active" : "inactive",
        ];

        return row;
      });

      // Combine headers and rows
      const csvContent = [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `products_export_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success(`${products.length} products exported successfully`, { id: exportId });
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`Export failed: ${msg}`, { id: exportId });
      });
    }
  };
  return (
    <>
      <HeaderContainer
        title="Products"
        description="Manage your products from here"
      >
        <div className="flex gap-2">
          <Button
            onPress={() => exportProducts(allProducts)}
            color="secondary"
            startContent={<Download size={18} />}
            variant="flat"
            isDisabled={allProducts.length === 0}
          >
            Export
          </Button>
          <Button
            onPress={onOpen}
            color="secondary"
            startContent={<Upload size={18} />}
            variant="flat"
          >
            Bulk Upload
          </Button>
          <Button as={Link} href={URLs.store.products.create} color="primary">
            Add
          </Button>
        </div>
      </HeaderContainer>

      <ProductsTable onProductsLoaded={setAllProducts} />

      {/* Bulk Upload Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet size={24} />
                  <span>Bulk Product Upload</span>
                </div>
              </ModalHeader>
              <ModalBody>
                {/* Instructions Card */}
                <Card className="bg-default-50">
                  <CardBody>
                    <h4 className="text-sm font-semibold mb-2">
                      Instructions:
                    </h4>
                    <ol className="text-sm space-y-1 pl-4 list-decimal">
                      <li>Download the template file below</li>
                      <li>Fill in your product data</li>
                      <li>
                        For categories, use comma-separated values (e.g.,
                        &quot;Electronics,Gadgets&quot;)
                      </li>
                      <li>
                        Categories will be created automatically if they
                        don&apos;t exist
                      </li>
                      <li>
                        Status defaults to &quot;active&quot; (use
                        &quot;inactive&quot; to create disabled products)
                      </li>
                      <li>Save and upload the file</li>
                    </ol>
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      startContent={<Download size={16} />}
                      onPress={downloadTemplate}
                      className="mt-3"
                    >
                      Download Template
                    </Button>
                  </CardBody>
                </Card>

                {/* File Upload Section */}
                <div className="mt-4">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-default-300 rounded-lg cursor-pointer hover:bg-default-50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-default-400" />
                      <p className="mb-2 text-sm text-default-600">
                        {file ? (
                          <span className="font-semibold">{file.name}</span>
                        ) : (
                          <>
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-default-400">
                        Excel or CSV (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </label>
                </div>

                {/* Upload Progress */}
                {loading && (
                  <div className="mt-4">
                    <Progress
                      value={uploadProgress}
                      color="primary"
                      showValueLabel={true}
                      className="mb-2"
                    />
                    <p className="text-sm text-center text-default-500">
                      Processing your file...
                    </p>
                  </div>
                )}

                {/* Upload Result */}
                {result && !loading && (
                  <Card className="mt-4 bg-success-50 border-success-200">
                    <CardBody>
                      <h4 className="text-sm font-semibold text-success-700 mb-2">
                        ✓ Upload Complete
                      </h4>
                      <p className="text-sm text-success-600">
                        {result.created} products created successfully
                      </p>

                      {result.errors && result.errors.length > 0 && (
                        <div className="mt-3 p-3 bg-warning-50 rounded-lg border border-warning-200">
                          <h5 className="text-xs font-semibold text-warning-700 mb-2">
                            ⚠ Some rows had errors:
                          </h5>
                          <ul className="text-xs space-y-1 text-warning-600 max-h-32 overflow-y-auto">
                            {result.errors.map((err, idx) => (
                              <li key={idx}>
                                Row {err.row}: {err.message}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={loading}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleUpload}
                  isDisabled={!file || loading}
                  isLoading={loading}
                >
                  Upload Products
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Page;
