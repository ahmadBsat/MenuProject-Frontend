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
        "price",
        "category",
        "stock",
        "sku",
        "image",
        "status",
      ],
      [
        "Sample Product 1",
        "Product description",
        "19.99",
        "Electronics,Gadgets",
        "100",
        "SKU001",
        "https://example.com/image.jpg",
        "active",
      ],
      [
        "Sample Product 2",
        "Another description",
        "29.99",
        "Clothing",
        "50",
        "SKU002",
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
  return (
    <>
      <HeaderContainer
        title="Products"
        description="Manage your products from here"
      >
        <div className="flex gap-2">
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

      <ProductsTable />

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
