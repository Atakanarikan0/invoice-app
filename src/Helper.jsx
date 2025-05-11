import Home from "./assets/components/Home"
import CreateInvoice from "./assets/components/CreateInvoice"
import ViewInvoice from "./assets/components/ViewInvoice"
import EditInvoice from "./assets/components/EditInvoice"

const routers = [
  {
    url:"/",
    component:<Home />
  },
  {
    url:"/create-invoice",
    component:<CreateInvoice />
  },
  {
    url:"/view-invoice",
    component:<ViewInvoice />
  },
  {
    url:"/edit-invoice",
    component:<EditInvoice />
  },
]

export function getPage(url) {
  return routers.findLast(router => url.startsWith(router.url)) ?? <h1>404 NOT FOUND!</h1>
}