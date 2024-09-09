import React, { useState } from 'react';

function DiscountCodeInput() {
    const [discountCode, setDiscountCode] = useState('');  // State to hold the user input for the discount code
    const [error, setError] = useState('');  // State to display any error messages
    const [responseMessage, setResponseMessage] = useState('');  // State to display function response or success message

    const fetchFunctionData = async () => {
        if (!discountCode.trim()) {
            setError("Please enter a discount code.");
            return;  // Early return if the input is empty
        }

        const payload = {
            code: discountCode.trim()  // Ensuring whitespace is trimmed from user input
        };

        try {
            const response = await fetch('https://cloud.appwrite.io/v1/functions/66df1f8400179e0d7260/executions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': '66c9f3e7000496e06b42',
                    'X-Appwrite-Key': 'standard_1640df07354262c93f4ddbc127c62d0538df6ce4cb6f362b1e06ea409631ecbe7ba89b46fd6021c5cf119469f6ad8d5237841b2b9b30d6311fa5ad8c8cdc658591d2f5bc910062f05d39598f93283c9bcaf466d2d94ce1f63af465cdafcb8f8104a9ecda79815c4021a8e2a8e70f548565d3b69a691f8fffe01dd4e2fa7e16e9',
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log("Response data:", data); // Log the response data for debugging

            if (!response.ok) {
                throw new Error(`Failed to execute function, status: ${response.status}`);
            }
            
            setResponseMessage(`Function executed successfully: Discount Applied: ${data.discountPercent ? data.discountPercent : '0'}%`);
            setError('');  // Clearing any previous errors on successful operation
        } catch (error) {
            console.error('Error executing function:', error);
            setError(`Failed to apply discount. Please check the code and try again. Error: ${error.message}`);
            setResponseMessage('');  // Clearing any previous success messages
        }
    };

    return (
        <div>
            <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
            />
            <button onClick={fetchFunctionData}>Apply Discount</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

export default DiscountCodeInput;
