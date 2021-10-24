import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ColorTabs from './tabs';

const useStyles = makeStyles({
    tabsWrapper: {
        margin: '10px 100px 0px 100px',
    },
    mainWrapper: {
        backgroundColor: '#FFFFFF',
        margin: '0px 100px 50px 100px',
        padding: '25px 50px 50px 50px',
        borderRadius: '10px'
    },
    title: {
        fontSize: '1rem',
        fontFamily: 'Open Sans',
        color: 'grey',
        textTransform: 'uppercase',
    },
    metricTitle: {
        fontSize: '1rem',
        fontFamily: 'Open Sans',
        color: 'grey',
        fontWeight: 'bold',
    },
    base: {
        fontSize: '1rem',
        fontFamily: 'Open Sans',
        color: '#CCCCCC',
    }
});


function Details() {
    const [metrics, setMetrics] = React.useState([]);
    const classes = useStyles();

    let { companyId } = useParams();

    useEffect(() => {
        axios.get(`https://hackathon-bbva-21-calc-verde.herokuapp.com/company/${companyId}`)
            .then(({ data }) => {

                setMetrics(data[0]);
            })

    }, [companyId])

    return (
        <Grid>
            <Grid item xs={12} className={classes.tabsWrapper}>
                <ColorTabs />
            </Grid>
            <Grid item xs={12}>
                <Grid className={classes.mainWrapper}>
                    <Grid item xs={6}>
                        <p className={classes.title}>Vista general</p>
                        <Grid container>
                            <Grid item xs={12}>
                                <p className={classes.metricTitle}>Código cliente</p>
                                <p className={classes.base}>{metrics.cd_cliente}</p>

                                <p className={classes.metricTitle}>Código grupo</p>
                                <p className={classes.base}>{metrics.cd_grupo}</p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <p className={classes.metricTitle}>Nivel grupo</p>
                                <p className={classes.base}>{metrics.nivel_grupo}</p>

                                <p className={classes.metricTitle}>Fecha de alta</p>
                                <p className={classes.base}>{metrics.fh_alta}</p>

                                <p className={classes.metricTitle}>Fecha nacimiento</p>
                                <p className={classes.base}>{metrics.fh_nacimiento}</p>

                                <p className={classes.metricTitle}>TP del sector</p>
                                <p className={classes.base}>{metrics.tp_sector}</p>

                                <p className={classes.metricTitle}>Código actividad</p>
                                <p className={classes.base}>{metrics.cd_actividad}</p>

                                <p className={classes.metricTitle}>Código postal</p>
                                <p className={classes.base}>{metrics.cd_postal}</p>

                                <p className={classes.metricTitle}>Código del estado</p>
                                <p className={classes.base}>{metrics.cd_estado}</p>

                            </Grid>
                            <Grid item xs={4}>

                                <p className={classes.metricTitle}>Nombre del sector</p>
                                <p className={classes.base}>{metrics.nm_sector}</p>

                                <p className={classes.metricTitle}>Recursos</p>
                                <p className={classes.base}>{metrics.recursos}</p>

                                <p className={classes.metricTitle}>Credito</p>
                                <p className={classes.base}>{metrics.credito}</p>

                                <p className={classes.metricTitle}>Rentabilidad</p>
                                <p className={classes.base}>{metrics.rentabilidad}</p>

                                <p className={classes.metricTitle}>Consumo CFE 12m</p>
                                <p className={classes.base}>{metrics.consumo_cfe_12m}</p>

                                <p className={classes.metricTitle}>Pagos CFE 12m</p>
                                <p className={classes.base}>{metrics.pagos_cfe_12m}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Details;
