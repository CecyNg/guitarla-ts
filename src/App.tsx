import Header from './components/Header.tsx'
import Guitar from './components/Guitar.tsx'
import {useCart} from './hooks/useCart.ts'
import { CartItem, GuitarT } from './types'

function App() {

  const {data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, ClearCart, isEmpty, cartTotal} = useCart()

  
  return (
    <>
    <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={ClearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        

        {data.map((guitar : CartItem) =>(
             <Guitar
                key={guitar.id} 
                guitar={guitar}
                addToCart={addToCart}

             />
        ))}
    
         

          <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src="./public/img/guitarra_01.jpg" alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">Lukather</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem nesciunt, amet deserunt</p>
                    <p className="fw-black text-primary fs-3">$299</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                    >Agregar al Carrito</button>
                </div>
            </div>
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
