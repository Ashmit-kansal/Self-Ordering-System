import React from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Modal.setAppElement('#root');

const ReceiptModal = ({ isOpen, onRequestClose, orderDetails, discount }) => {
  const calculateTotal = () => {
    return orderDetails.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscountedTotal = () => {
    return calculateTotal() - discount;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Receipt', 105, 20, null, null, 'center');

    // Add subtitle
    doc.setFontSize(12);
    doc.text('Your order is being prepared.', 105, 30, null, null, 'center');
    doc.text('Collect your token after making the payment at counter.', 105, 35, null, null, 'center');
    doc.text('Thanks for ordering.', 105, 40, null, null, 'center');

    // Add order details
    const tableColumn = ['Item', 'Quantity', 'Price', 'Total'];
    const tableRows = [];

    orderDetails.forEach((item) => {
      const itemData = [
        item.productName,
        item.quantity,
        `₹${item.price.toFixed(2)}`,
        `₹${(item.price * item.quantity).toFixed(2)}`,
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });

    // Add discount and total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Discount: ₹${discount.toFixed(2)}`, 105, finalY, null, null, 'center');
    doc.text(`Total: ₹${calculateDiscountedTotal().toFixed(2)}`, 105, finalY + 10, null, null, 'center');

    // Save the PDF
    doc.save('receipt.pdf');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Receipt"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Receipt</h2>
        <div className="mb-4">
          {Array.isArray(orderDetails) && orderDetails.map((item) => (
            <div key={item.productName} className="flex justify-between mb-2">
              <span>{item.productName} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold">
          <span>Discount:</span>
          <span>₹{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>₹{calculateDiscountedTotal().toFixed(2)}</span>
        </div>
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          Download Receipt
        </button>
        <button
          onClick={onRequestClose}
          className="bg-orange-500 text-white py-2 px-4 rounded mt-4 hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ReceiptModal;