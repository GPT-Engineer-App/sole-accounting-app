import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "@/components/TransactionForm";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-03-15", amount: 250, type: "Expense", category: "Nike" },
    { id: 2, date: "2023-03-20", amount: 300, type: "Income", category: "Adidas" },
    { id: 3, date: "2023-03-25", amount: 180, type: "Expense", category: "Puma" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
    setIsAddModalOpen(false);
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sneaker Accounting</h1>
      
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm onSubmit={addTransaction} />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditingTransaction(transaction)}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Transaction</DialogTitle>
                    </DialogHeader>
                    {editingTransaction && (
                      <TransactionForm transaction={editingTransaction} onSubmit={editTransaction} />
                    )}
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => deleteTransaction(transaction.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;