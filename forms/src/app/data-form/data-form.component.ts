import { Observable } from 'rxjs';
import { ConsultaCepService } from "./../shared/services/consulta-cep.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";

import { EstadoBr } from "./../shared/models/estado-br";
import { DropdownService } from "../shared/services/dropdown.service";
import { FormValidation } from '../shared/form-validation';
@Component({
  selector: "app-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.css"]
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  estados: EstadoBr[];
  //estados: Observable<EstadoBr>[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks = ['Angular', 'SpringBoot', 'React', 'Vue']

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit() {
    this.estados = this.dropDownService.getEstadoBr();
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologia();
    this.newsletterOp = this.dropDownService.getNewsletter();
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
      confirmarEmail: [null, [FormValidation.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidation.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.builFrameworks(),

    });
  }

  builFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidation.requiredMinCheckbox(1));

    /*  this.formBuilder.array([
       new FormControl(false), // Angular
       new FormControl(false), // SpringBoot
       new FormControl(false), // React
       new FormControl(false) // Vue
 
     ]) */
  }
  

  onSubmit() {

    console.log(this.formulario);
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });
    console.log(valueSubmit);


    if (this.formulario.valid) {

      this.http
        .post("https://httpbin.org/post", JSON.stringify(valueSubmit({})))
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
  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError('required') &&
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
  // setando um cargo
  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);

  }
  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }
  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'ruby']);
  }
}
