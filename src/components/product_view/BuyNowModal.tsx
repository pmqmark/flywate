"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ModalWrapper from "../common/ui/ModalWrapper";
import { toast } from "sonner";

interface BuyNowModalProps {
    onClose: () => void;
    product: {
        id: number;
        title: string;
        amount: number;
        seo_Description: string,
    };
}

const BuyNowModal = ({ onClose, product }: BuyNowModalProps) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        quantity: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleQuantity = (type: "inc" | "dec") => {
        setForm((prev) => ({
            ...prev,
            quantity:
                type === "inc" ? prev.quantity + 1 : Math.max(1, prev.quantity - 1),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        console.log("hi i am clicked")
        const payload = {
            ...form,
            productTitle: product?.seo_Description,
            amount: product.amount,
        };

        try {
            const res = await fetch("/api/buy-now", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Your order was placed! We’ll connect within 24 hrs.");  
                onClose();
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.log(error, 'error')
            toast.error("Failed to submit order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper className="p-5">
            <div className="bg-background p-6 md:p-8 border border-primary/40 relative w-[95%] md:w-[600px] mx-auto rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="font-semibold text-xl">Complete Your Order</h1>
                    <IoClose onClick={onClose} className="cursor-pointer text-lg" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* inputs */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-white/30 bg-transparent px-3 py-2 text-sm rounded focus:outline-none focus:border-primary"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-white/30 bg-transparent px-3 py-2 text-sm rounded focus:outline-none focus:border-primary"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border border-white/30 bg-transparent px-3 py-2 text-sm rounded focus:outline-none focus:border-primary"
                        required
                    />

                    {/* product details */}
                    <div className="bg-[#0B1414] p-4 rounded-lg text-sm text-white/90 shadow-md border border-primary/30">
                        <p className="mb-2 text-base font-medium">
                            <span className="font-semibold text-primary">Product:</span>{" "}
                            {product.title}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold text-primary">Price:</span> ₹
                            {product.amount * form.quantity}
                        </p>

                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-primary">Quantity:</span>
                            <div className="flex items-center border border-white/30 rounded-md">
                                <button
                                    type="button"
                                    className="px-3 py-1 text-lg font-bold hover:bg-white/10"
                                    onClick={() => handleQuantity("dec")}
                                >
                                    −
                                </button>
                                <span className="px-6 text-base">{form.quantity}</span>
                                <button
                                    type="button"
                                    className="px-3 py-1 text-lg font-bold hover:bg-white/10"
                                    onClick={() => handleQuantity("inc")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* submit */}
                    <button
                        type="submit"
                        className="w-full bg-button  p-1.5 md:p-2 uppercase px-5 text-xs md:text-sm md:px-5 ">

                        {loading ? "Placing Order..." : "Submit Order"}
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
};

export default BuyNowModal;
