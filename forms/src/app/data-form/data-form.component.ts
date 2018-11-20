import { ConsultaCepService } from "./../shared/services/consulta-cep.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { EstadoBr } from "./../shared/models/estado-br";
import { DropdownService } from "../shared/services/dropdown.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.css"]
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  //estados: EstadoBr[];
  estados: Observable <EstadoBr[]>;
  cargos:any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {

    this.estados = this.dropDownService.getEstadoBr();
    this.cargos = this.dropDownService.getCargos();


   /*  this.dropDownService.getEstadoBr().subscribe(dados => {
    this.estados = dados;
      console.log(dados);
    });
 */
    /*   this.formulario = new FormGroup({
        nome: new FormControl(null),
        email: new FormControl(null)

        endreco: new FormGroup({
          cep: new FormControl(null)
        })
       }); */

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: null

    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      this.http
        .post("https://httpbin.org/post", JSON.stringify(this.formulario.value))
        .subscribe(
          dados => {
            console.log(dados);
            this.formulario.reset();
          },
          (erro: any) => alert("erro")
        );
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    // retornando uma coleção
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }
  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get("email");
    if (campoEmail.errors) {
      return campoEmail.errors["email"] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "has-feedback": this.verificaValidTouched(campo)
    };
  }

  consultaCEP() {

    let cep = this.formulario.get("endereco.cep").value;
    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe(dados => this.popularDadosForm(dados));
    }
  }

  popularDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        // cep: dados.cep,
        numero: "",
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }
  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        numero: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
