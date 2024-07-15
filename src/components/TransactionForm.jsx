import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TransactionForm = ({ transaction, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "",
    category: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ date: "", amount: "", type: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select name="type" value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Adidas">Adidas</SelectItem>
            <SelectItem value="Puma">Puma</SelectItem>
            <SelectItem value="Reebok">Reebok</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{transaction ? "Update" : "Add"} Transaction</Button>
    </form>
  );
};

export default TransactionForm;