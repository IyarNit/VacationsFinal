import React from "react"

const Modal = (props: any) => {
    // console.log("modalProps", props)
    
    const { hide, show, children } = props
    const showHideClassName = show ? 'modal1 display-block1' : 'modal1 display-none1';
    return (
        <div className={showHideClassName}>
            <section className='modal-main1'>
                {children}
                <br />
                <button className="btn btn-dark" onClick={hide} style={{ display: props.display, marginTop: "30px", marginBottom: "15px" }}>
                    {props.btn}
                </button>
            </section>
        </div>
    );
};

const container = document.createElement('div');
document.body.appendChild(container);

export default Modal