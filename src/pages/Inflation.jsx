import { useState } from 'react'
import { Box, TextField, Typography, Paper } from '@mui/material'

export const Inflation = () => {
  const [oldPrice, setOldPrice] = useState('')
  const [newPrice, setNewPrice] = useState('')

  const calculateInflation = () => {
    if (!oldPrice || !newPrice) return 0
    const inflationRate = ((newPrice - oldPrice) / oldPrice) * 100
    return inflationRate.toFixed(2)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: '500px', width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Inflation Calculator
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Old Price"
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="New Price"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
          />
        </Box>

        <Typography variant="h6" align="center">
          Inflation Rate: {calculateInflation()}%
        </Typography>
      </Paper>
    </Box>
  )
}
