import React, { useState, useEffect } from 'react';
import { Occupation } from '../Interfaces/Occupation';
import { PremiumCalculatorRequest } from '../Interfaces/PremiumCalculatorRequest';
import './PremiumCalculator.css';
// Sample occupation data
const occupations: Occupation[] = [
    { name: 'Cleaner', rating: 'Light Manual', factor: 11.50 },
    { name: 'Doctor', rating: 'Professional', factor: 1.5 },
    { name: 'Author', rating: 'White Collar', factor: 2.25 },
    { name: 'Farmer', rating: 'Heavy Manual', factor: 31.75 },
    { name: 'Mechanic', rating: 'Heavy Manual', factor: 31.75 },
    { name: 'Florist', rating: 'Light Manual', factor: 11.50 },
    { name: 'Other', rating: 'Heavy Manual', factor: 31.75 }
];
// Component for Premium Calculator
const PremiumCalculator: React.FC = () => {
    //State hooks
    const [form, setForm] = useState<PremiumCalculatorRequest>({} as PremiumCalculatorRequest);
    const [premium, setPremium] = useState<number | null>(null);
    const allFieldsFilled = (f: PremiumCalculatorRequest) => Boolean(f.name && f.age && f.dateOfBirth && f.occupation && f.deathCoverAmount);
    
    // Handle change event to handle the input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };
        console.log(updatedForm);
        setForm(updatedForm);
        // setForm((prevForm) => ({
        //     ...prevForm,
        //     [name]: name === 'age' || name === 'deathCoverAmount' ? Number(value) : value
        // }));
        // Logic to check if all fields are filled and occupation is changed
        if (allFieldsFilled(updatedForm) && name === 'occupation') {
            calculatePremium(updatedForm);
        } 
    }
    // Function to calculate premium based on the form data
    const calculatePremium = (data: PremiumCalculatorRequest) => {
    const selectedOcc = occupations.find((o) => o.name === data.occupation);
    if (!selectedOcc) return;

    const { factor } = selectedOcc;
    const age = Number(data.age);
    const deathCover = Number((data as any).deathCoverAmount ?? (data as any).deathCover);
    const premiumValue =
      ((deathCover * factor * age) / 1000) * 12;
        console.log("Calculated Premium: ", premiumValue);
    setPremium(premiumValue);
  };
    // TODO: implement calculation and UI
    return (
        <div className="premium-calculator container">
            <h2>Premium Calculator</h2>
            {/* Form inputs and premium display will go here */}
            
            <div>
                <label>Name: 
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>Age Next Birthday: 
                    <input type="text" name="age" value={form.age} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Date of Birth (MM/YYYY): 
                    <input type="month" name="dateOfBirth" value={form.dateOfBirth}
                        onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>Death - Sum Insured: 
                <input type="number" name="deathCoverAmount" value={form.deathCoverAmount} onChange={handleChange} required />
                </label>
            </div>

            <div>
                <label>
                    Usual Occupation: 
                <select
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Occupation</option>
                    {occupations.map((occ) => (
                    <option key={occ.name} value={occ.name}>
                        {occ.name} ({occ.rating})
                    </option>
                    ))}
                </select>
                </label>
            </div>

            {premium !== null && (
                <div>
                    <h3>Your Monthly Premium is: ${premium.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default PremiumCalculator;