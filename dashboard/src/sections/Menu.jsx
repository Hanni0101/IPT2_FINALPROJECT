import { useState, useEffect } from 'react'
import './Menu.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import beefSinigang from '../assets/BEEF SINIGANG.png'
import chickenShanghai from '../assets/CHICKEN SHANGHAI.png'
import seafoodSinigang from '../assets/SEAFOOD SINIGANG.png'
import sizzlingCrispyPorkKareKare from '../assets/SIZZLING CRISPY PORK KARE-KARE.png'
import sizzlingCrispySisig from '../assets/SIZZLING CRSIPY SISIG.png'
import smoresBiscoff from '../assets/SMORES BISCOFF.png'
import turonAlaMode from '../assets/TURON ALA MODE.png'
import wagyuCubes from '../assets/WAGYU CUBES.png'

const defaultProducts = [
  {
    _id: 'default1',
    Name: 'Beef Sinigang',
    Description: 'Classic Filipino sour soup with tender beef and fresh vegetables.',
    Price: 320,
    Photo: beefSinigang
  },
  {
    _id: 'default2',
    Name: 'Chicken Shanghai',
    Description: 'Crispy fried spring rolls filled with savory chicken.',
    Price: 180,
    Photo: chickenShanghai
  },
  {
    _id: 'default3',
    Name: 'Seafood Sinigang',
    Description: 'A medley of seafood in a tangy tamarind broth.',
    Price: 350,
    Photo: seafoodSinigang
  },
  {
    _id: 'default4',
    Name: 'Sizzling Crispy Pork Kare-Kare',
    Description: 'Sizzling pork in peanut sauce with vegetables.',
    Price: 340,
    Photo: sizzlingCrispyPorkKareKare
  },
  {
    _id: 'default5',
    Name: 'Sizzling Crispy Sisig',
    Description: 'Chopped pork, onions, and chili on a sizzling plate.',
    Price: 260,
    Photo: sizzlingCrispySisig
  },
  {
    _id: 'default6',
    Name: 'Smores Biscoff',
    Description: 'Gooey marshmallow and chocolate with Biscoff spread.',
    Price: 120,
    Photo: smoresBiscoff
  },
  {
    _id: 'default7',
    Name: 'Turon Ala Mode',
    Description: 'Banana spring roll with ice cream on top.',
    Price: 110,
    Photo: turonAlaMode
  },
  {
    _id: 'default8',
    Name: 'Wagyu Cubes',
    Description: 'Tender wagyu beef cubes, grilled to perfection.',
    Price: 450,
    Photo: wagyuCubes
  }
]

function Menu({ user }) {
  const [products, setProducts] = useState(defaultProducts)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => {
        setProducts([...defaultProducts, ...data])
      })
      .catch(() => setProducts(defaultProducts))
  }, [])

  const openOrderModal = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedProduct(null)
    setQuantity(1)
  }

  return (
    <section className="menu-section" id="menu">
      <h2>Sizzle Menu</h2>
      {!user && (
        <div className="menu-login-warning">
        </div>
      )}
      <div className="menu-grid">
        {products.length === 0 ? (
          <div className="menu-empty">No menu items available.</div>
        ) : (
          products.map(product => (
            <div className="menu-card" key={product._id}>
              <div className="menu-img-wrap">
                <img
                  src={
                    typeof product.Photo === 'string' && product.Photo.startsWith('/uploads/')
                      ? `http://localhost:5000${product.Photo}`
                      : product.Photo
                  }
                  alt={product.Name}
                />
              </div>
              <div className="menu-info">
                <h3>{product.Name}</h3>
                <p className="menu-desc">{product.Description}</p>
                <div className="menu-bottom-row">
                  <div className="menu-price">₱{Number(product.Price).toFixed(2)}</div>
                  {user ? (
                    <button className="menu-order-btn" onClick={() => openOrderModal(product)}>
                      <ShoppingCartIcon />
                    </button>
                  ) : (
                    <button className="menu-order-btn" disabled>
                      <ShoppingCartIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {modalOpen && selectedProduct && (
        <div className="order-modal-backdrop" onClick={closeModal}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <div className="order-modal-content">
              <img
                src={
                  typeof selectedProduct.Photo === 'string' && selectedProduct.Photo.startsWith('/uploads/')
                    ? `http://localhost:5000${selectedProduct.Photo}`
                    : selectedProduct.Photo
                }
                alt={selectedProduct.Name}
                style={{ width: '260px', height: '180px', borderRadius: '12px', marginBottom: '1.2rem', objectFit: 'cover', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>{selectedProduct.Name}</h3>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{selectedProduct.Description}</p>
              <div style={{ fontWeight: 700, color: '#e67e22', marginBottom: '0.7rem' }}>₱{Number(selectedProduct.Price).toFixed(2)}</div>
            </div>
            <div className="order-modal-actions">
              <label style={{ color: '#000', fontWeight: 500 }}>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  style={{ marginLeft: '0.5rem', width: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px', padding: '0.25rem', color: '#000' }}
                />
              </label>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Menu