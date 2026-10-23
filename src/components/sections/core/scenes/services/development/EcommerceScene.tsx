import shopify from "@/assets/images/technologies/menu/shopify.svg";
import woocommerce from "@/assets/images/technologies/menu/woocommerce.svg";
import { at, Bar, Browser, Canvas, delay, Glass, LineIcon, LogoTile, Toast } from "../../parts";

// E-Commerce Development: a product page (photo, price, colours, sizes, "Add to cart"), the cart
// sliding in beside it, a "Payment received" toast, and Shopify and WooCommerce tiles.

const cart = [
  { tint: "from-[#ffd9cf] to-[#f7c3d2]", price: "$129" },
  { tint: "from-[#2a2f63] to-[#5b3a6e]", price: "$89" },
];

export function EcommerceScene() {
  return (
    <Canvas>
      <Browser url="shop.your-brand.com" style={at(0, 40, 370, 320)} className="motion-safe:animate-drift">
        <div className="grid grid-cols-[1.05fr_1fr] gap-[2.2cqw] p-[2.2cqw]">
          {/* The product photo. */}
          <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[1.8cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]">
            <span className="absolute top-[1.4cqw] left-[1.4cqw] rounded-full bg-white px-[1.2cqw] py-[0.4cqw] text-[1.4cqw] font-semibold text-crimson">New</span>
            <span className="size-[16cqw] rounded-[45%_55%_50%_50%] bg-brand-gradient-reverse shadow-[0_2cqw_4cqw_-1cqw_rgb(201_29_76_/_0.6)]" />
          </div>
          <div className="flex flex-col">
            <Bar className="h-[1cqw] w-1/3 bg-primary/30" />
            <Bar className="mt-[1.2cqw] h-[2.2cqw] w-full bg-primary/85" />
            <Bar className="mt-[0.8cqw] h-[2.2cqw] w-2/3 bg-primary/85" />
            <span className="mt-[1.8cqw] text-[3cqw] font-semibold text-primary">$129.00</span>
            <span className="mt-[1.6cqw] flex gap-[1cqw]">
              {["bg-crimson", "bg-coral", "bg-primary"].map((color, index) => (
                <span key={color} className={`size-[2.8cqw] rounded-full ${color} ${index === 0 ? "ring-[0.4cqw] ring-crimson/30 ring-offset-[0.3cqw]" : ""}`} />
              ))}
            </span>
            <span className="mt-[1.6cqw] flex gap-[0.9cqw]">
              {["S", "M", "L"].map((size) => (
                <span
                  key={size}
                  className={`grid size-[3.6cqw] place-items-center rounded-[0.9cqw] text-[1.5cqw] font-semibold ${size === "M" ? "bg-primary text-white" : "bg-primary/[0.06] text-primary/60"}`}
                >
                  {size}
                </span>
              ))}
            </span>
            <span className="mt-auto flex h-[4.4cqw] items-center justify-center gap-[1cqw] rounded-full bg-brand-gradient-reverse text-[1.7cqw] font-semibold text-white">
              <LineIcon className="size-[2.2cqw]">
                <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2M9 20h.01M17 20h.01" />
              </LineIcon>
              Add to cart
            </span>
          </div>
        </div>
      </Browser>

      {/* The cart. */}
      <Glass style={{ ...at(330, 175, 255, 230), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <span className="text-[2.1cqw] font-semibold text-white">Your cart</span>
          <span className="grid size-[3.2cqw] place-items-center rounded-full bg-brand-gradient text-[1.5cqw] font-semibold text-white">2</span>
        </div>
        <div className="mt-[1.8cqw] space-y-[1.4cqw]">
          {cart.map((item) => (
            <div key={item.price} className="flex items-center gap-[1.4cqw]">
              <span className={`size-[5cqw] shrink-0 rounded-[1.2cqw] bg-linear-to-br ${item.tint}`} />
              <span className="flex-1 space-y-[0.8cqw]">
                <Bar className="w-4/5 bg-white/50" />
                <Bar className="h-[0.9cqw] w-1/2 bg-white/20" />
              </span>
              <span className="text-[1.8cqw] font-semibold text-light/85">{item.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-[1.8cqw] flex items-center justify-between border-t border-white/10 pt-[1.6cqw] text-[1.8cqw]">
          <span className="text-light/60">Total</span>
          <span className="font-semibold text-white">$218.00</span>
        </div>
        <span className="mt-[1.6cqw] flex h-[4cqw] items-center justify-center rounded-full bg-white text-[1.7cqw] font-semibold text-primary">Checkout</span>
      </Glass>

      <Toast label="Payment received" detail="Order #1042" style={at(30, 400)} wait={-1.2}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </Toast>

      <LogoTile logo={shopify} label="Shopify" style={at(420, 30)} wait={-0.6} />
      <LogoTile logo={woocommerce} label="WooCommerce" style={at(400, 100)} wait={-2.8} />
    </Canvas>
  );
}
