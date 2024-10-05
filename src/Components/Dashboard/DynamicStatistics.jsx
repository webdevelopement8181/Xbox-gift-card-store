import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BsFillArchiveFill, BsPeopleFill } from 'react-icons/bs';
import '../../assets/css/DynamicStatistics.css'
import { databases } from '../../appwrite';

const DynamicStatistics = () => {
  const [onlineProductCount, setOnlineProductCount] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const onlineProductResponse = await databases.listDocuments(
          '66cde1b70007c60cbc12',
          '66cde1ce003c4c7dfb11'
        );
        setOnlineProductCount(onlineProductResponse.total);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" marginBottom="50px" marginLeft="20px" gutterBottom>
       Admin  Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center" marginLeft="20px">
        {/* Online Products */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ backgroundColor: '#AA77FF', color: '#fff' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">ONLINE PRODUCTS</Typography>
                <BsFillArchiveFill style={{ fontSize: '2rem' }} />
              </div>
              <Typography variant="h3" align="center">
                {onlineProductCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Customers */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ backgroundColor: '#5A639C', color: '#fff' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">CUSTOMERS</Typography>
                <BsPeopleFill style={{ fontSize: '2rem' }} />
              </div>
              <Typography variant="h3" align="center">
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ backgroundColor: '#5A639C', color: '#fff' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">ALERTS</Typography>
                <BsPeopleFill style={{ fontSize: '2rem' }} />
              </div>
              <Typography variant="h3" align="center">
                25
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DynamicStatistics;
