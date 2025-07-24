interface SaleCheckProps {
  sale: boolean;
  onChangeSale:()=>void;
  onChangeBuy:()=>void;
}
const SaleCheck = ({ sale,onChangeSale,onChangeBuy }: SaleCheckProps) => {    
  return (
    <div>
      <div className="pb-2">
        <label>Tipo de anuncio</label>
      </div>
      <div>
        <input
          type="radio" 
          id="sale"
          name="type"
          checked={sale}   
          onChange={()=>onChangeSale()}                                  
        />
        <label htmlFor="sale">Para la venta</label>
      </div>
      <div>
        <input
          type="radio" 
          id="buy"  
          name="type"
          checked={!sale} 
          onChange={()=>onChangeBuy()}                                  
        />
        <label htmlFor="buy">Compra</label>
      </div>
    </div>
  );
};

export default SaleCheck;
