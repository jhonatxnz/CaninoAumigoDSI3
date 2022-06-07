import { useState } from 'react';
import "./Rodape.css"
import Logo from "./Logo"
//JANELA POP UP
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
//JANELA POP UP
export default function Rodape(props) {
    const [open, setOpen] = useState(false);

    const handleClose = (event) => {
        setOpen(false);
    };
    function clicou(event) {
        console.log("njsahdjkashd")

        setOpen(true)
    }
    return (
        <footer>
            <div>

                <div>
                    <Logo />
                </div>

                <div>
                    <h2>Como ajudar?</h2>
                    <a href="/adotar">Quero adotar</a><br />
                    <a href="/doar">Quero doar</a>
                </div>

                <div>
                    <h2>Suporte</h2>
                    <a onClick={e => clicou(e)}>Email</a><br />
                    <a onClick={e => clicou(e)}>Contato</a>
                </div>

                <div>
                    <h2>Redes sociais</h2>
                    <a href="https://www.facebook.com/CaninoAumigo-105853458820645" target="blank">Facebook</a><br />
                    <a href="https://instagram.com/caninoaumigo?igshid=YmMyMTA2M2Y=" target="blank">Instagram</a>
                </div>

                <div>
                    <h2><a href="/sobre">Sobre nós</a> </h2>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Olá somos da equipe do CaninoAumigo
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <strong>Entre em contato por email</strong> <br/>
                        cc21686@g.unicamp.br                        <br/>
                        cc21694@g.unicamp.br                        <br/>
                        cc21254@g.unicamp.br                        <br/>
                        <strong>Ou pelas redes sociais</strong>     <br/>
                        <a href="https://www.facebook.com/CaninoAumigo-105853458820645" target="blank">Facebook</a><br/>
                        <a href="https://instagram.com/caninoaumigo?igshid=YmMyMTA2M2Y=" target="blank">Instagram</a>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Fechar</button>
                </DialogActions>
            </Dialog>
        </footer>
    );
}