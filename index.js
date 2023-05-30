const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bkfwodagxulmbjxupvxh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZndvZGFneHVsbWJqeHVwdnhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzY3Nzg0NCwiZXhwIjoxOTk5MjUzODQ0fQ.pyWM7sA4-jc4ROPbL9HH25j2mz7qIW95pnKIzY3Ptdw';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());

// Rota para consultar todos os produtos
app.get('/produtos', async (req, res) => {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');
  
  if (error) {
    return res.status(500).json({ error: 'Erro ao consultar os produtos' });
  }
  
  res.json(data);
});

// Rota para consultar um produto pelo ID
app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('id', id);
  
  if (error) {
    return res.status(500).json({ error: 'Erro ao consultar o produto' });
  }
  
  if (data.length === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  res.json(data[0]);
});

// Rota para cadastrar um produto
app.post('/produtos', async (req, res) => {
  const { nome, preco } = req.body;
  
  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, preco }]);
  
  if (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar o produto' });
  }
  
  res.json(data[0]);
});

// Rota para alterar um produto
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  
  const { data, error } = await supabase
    .from('produtos')
    .update({ nome, preco })
    .eq('id', id);
  
  if (error) {
 return res.status(500).json({ error: 'Erro ao alterar o produto' });
  }
  
  if (data.length === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  res.json(data[0]);
});

// Rota para deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', id);
  
  if (error) {
    return res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
  
  if (data.length === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  res.json({ message: 'Produto deletado com sucesso' });
});

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});