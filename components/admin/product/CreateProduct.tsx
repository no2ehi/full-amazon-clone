import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import SelectInputAdmin from "../inputs/SelectInputAdmin";
import MultipleSelectAdmin from "../inputs/MultipleSelectAdmin";
import InputAdmin from "../inputs/InputAdmin";
import DialogModal from "@/components/dialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "@/redux/slices/DialogSlice";
import ImagesProduct from "./images/ImagesProduct";
import Colors from "./colors/colors";
import Style from "./style/Style";
import Sizes from "./clickToAdd/Sizes";
import Details from "./clickToAdd/Details";
import Questions from "./clickToAdd/Questions";
import { validateCreateProduct } from "../../../utils/validation";
import dataURItoBlob from "../../../utils/dataURItoBlob";
import { uploadImages } from "../../../request/upload";
import axios from "axios";

const CreateProduct = ({
    parents,
    product,
    setProduct,
    categories,
    subs,
    images,
    setImages,
    setColorImage,
    colorImage,
    setLoading,
    initialProduct,
}: any) => {
    const dispatch = useDispatch();

    const validate = Yup.object({
        name: Yup.string()
            .required("please add a name")
            .min(10, "product name must between 10 and 300 characters")
            .max(300, "product name must between 10 and 300 characters"),
        brand: Yup.string().required("please add a brand"),
        category: Yup.string().required("please select atleast one category"),
        // subCategories: Yup.array().min(1, "please select atleast one sub category"),
        sku: Yup.string().required("please add a sku/number"),
        color: Yup.string().required("please add a color"),
        description: Yup.string().required("please add a description"),
    });
    const CreateProduct = async () => {
        let test = validateCreateProduct(product, images);
        if (test == "valid") {
            createProductHnadler();
        } else {
            dispatch(
                showDialog({
                    header: "Please follow our instructions.",
                    msgs: test,
                })
            );
        }
    };

    let uploaded_images: any = [];
    let style_img = "";
    const createProductHnadler = async () => {
        setLoading(true);
        if (images) {
            let temp = images.map((img: any) => {
                return dataURItoBlob(img);
            });
            const path = "product images";
            let formData = new FormData();
            formData.append("path", path);
            temp.forEach((image: any) => {
                formData.append("file", image);
            });
            uploaded_images = await uploadImages(formData);
            console.log("uploaded images: ", uploaded_images);
        }
        if (product.color.image) {
            let temp = dataURItoBlob(product.color.image);
            let path = "product style images";
            let formData = new FormData();
            formData.append("path", path);
            formData.append("file", temp);
            let cloudinary_style_img = await uploadImages(formData);
            style_img = cloudinary_style_img[0].url;
            console.log("uploaded style image: ", style_img);
        }
        try {
            const { data } = await axios.post("/api/admin/product/product", {
                ...product,
                images: uploaded_images,
                color: {
                    color: product.color.color,
                    image: style_img,
                },
            });
            setLoading(false);
            setProduct(initialProduct);
            setImages([]);
            setColorImage("");
            dispatch(
                showDialog({
                    header: "post created.",
                    msgs:{
                        msg: data.message,
                        type: "success",
                    },
                })
            );
        } catch (error: any) {
            setLoading(false);
            console.log(error.response.data.message);
        }
    };

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        if (name === "subCategories") {
            setProduct({
                ...product,
                [name]: typeof value === "string" ? value.split(",") : value,
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    return (
        <div className="my-4">
            <div className="flex p-2 border-b pb-1 font-semibold">
                Create a Product
            </div>

            <DialogModal />
            <Formik
                enableReinitialize
                initialValues={{
                    name: product.name,
                    brand: product.brand,
                    description: product.description,
                    category: product.category,
                    subCategories: product.subCategories,
                    parent: product.parent,
                    sku: product.sku,
                    discount: product.discount,
                    color: product.color.color,
                    imageInputFile: "",
                    styleInput: "",
                }}
                validationSchema={validate}
                onSubmit={() => {
                    CreateProduct();
                }}
            >
                {(formik) => (
                    <Form>
                        <ImagesProduct
                            name="imageInputFile"
                            header="Product Carousel Images"
                            text="Add Images"
                            images={images}
                            setImages={setImages}
                            setColorImage={setColorImage}
                        />
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                                {product.color.image && (
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={product.color.image}
                                            alt="color-image"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                                {product.color.color && (
                                    <span
                                        className="w-12 h-12 rounded-full shadow my-2"
                                        style={{
                                            backgroundColor: `${product.color.color}`,
                                        }}
                                    ></span>
                                )}
                            </div>
                            <Colors
                                name="color"
                                product={product}
                                setProduct={setProduct}
                                colorImage={colorImage}
                            />
                            <Style
                                name="styleInput"
                                product={product}
                                setProduct={setProduct}
                                colorImage={colorImage}
                            />
                            <SelectInputAdmin
                                name="parent"
                                value={product.parent}
                                label="Parent Product"
                                data={parents}
                                handleChange={handleChange}
                            />
                            <SelectInputAdmin
                                name="category"
                                value={product.category}
                                label="Category"
                                data={categories}
                                handleChange={handleChange}
                                disabled={product.parent}
                            />
                            {product.category && (
                                <MultipleSelectAdmin
                                    name="subCategories"
                                    value={product.subCategories}
                                    data={subs}
                                    label="Sub Categories"
                                    disabled={product.parent}
                                    handleChange={handleChange}
                                />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="p-2 border-b pb-1 font-semibold">
                                Basic info
                            </h3>
                            <InputAdmin
                                type="text"
                                name="name"
                                label="Name"
                                placeholder="Product Name"
                                icon="category"
                                onChange={handleChange}
                            />
                            <InputAdmin
                                type="text"
                                name="description"
                                label="Description"
                                placeholder="Product Description"
                                icon="category"
                                onChange={handleChange}
                            />
                            <InputAdmin
                                type="text"
                                name="brand"
                                label="Brand"
                                placeholder="Product Brand"
                                icon="category"
                                onChange={handleChange}
                            />
                            <InputAdmin
                                type="text"
                                name="sku"
                                label="Sku"
                                placeholder="Product Sku"
                                icon="category"
                                onChange={handleChange}
                            />
                            <InputAdmin
                                type="text"
                                name="discount"
                                label="Discount"
                                placeholder="Product Discount"
                                icon="category"
                                onChange={handleChange}
                            />
                            <Sizes
                                sizes={product.sizes}
                                product={product}
                                setProduct={setProduct}
                            />
                            <Details
                                details={product.details}
                                product={product}
                                setProduct={setProduct}
                            />
                            <Questions
                                questions={product.questions}
                                product={product}
                                setProduct={setProduct}
                            />
                        </div>
                        <button
                            disabled={setLoading}
                            type="submit"
                            className="my-4 w-52 bg-green-500 py-2 px-4 rounded text-white"
                        >
                            Create Product
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateProduct;
