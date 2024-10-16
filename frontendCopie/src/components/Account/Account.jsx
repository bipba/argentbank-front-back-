import arrow from "../../assets/arrow.webp";

function Account({ title, amount, description }) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">${amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
             
               
                    <img className="arrow-right"
                        src={arrow}  // Utilise la bonne syntaxe pour passer la source de l'image
                        alt="Right Arrow" 
                        
                    />
               
            </div>
        </section>
    );
}

export default Account;
