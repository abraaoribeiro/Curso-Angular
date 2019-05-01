import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {FormBuilder,Validators,FormControl} from "@angular/forms";
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {  empty, Observable } from "rxjs";


import { VerificaEmailService } from './services/verifica-email.service';
import { ConsultaCepService } from "./../shared/services/consulta-cep.service";
import { BaseFormComponent } from "../shared/base-form/base-form.component";
import { DropdownService } from "../shared/services/dropdown.service";
import { FormValidation } from '../shared/form-validation';
import { EstadoBr } from './../shared/models/estado-br';
import { Cidade } from './../shared/models/cidade';
@Component({
  selector: "app-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.css"]
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  //estados: EstadoBr [];
  cidades: Cidade [];
  estados: any;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks = ['Angular', 'SpringBoot', 'React', 'Vue'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmail: VerificaEmailService
  ) {
    super();
  }

  ngOnInit() {

    // this.verificaEmail.verificarEmail('email@email.com').subscribe();
    //this.estados = this.dropDownService.getEstadoBr();
    this.dropDownService.getEstadoBr().subscribe(dados => this.estados = dados);
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
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
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

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.popularDadosForm(dados) : {});

      //this.dropDownService.getCidades(8).subscribe(res => console.log(res))
        this.formulario.get('endereco.estado').valueChanges
        .pipe(
          tap(estado => console.log('Novo estado: ', estado)),
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap((estadoId: number) => this.dropDownService.getCidades(estadoId)),
          tap(console.log)

        ).subscribe(cidades => this.cidades = cidades)

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

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);

    this.http
      .post('https://httpbin.org/post', JSON.stringify({}))
      .subscribe(
        dados => {
          console.log(dados);
          // reseta o form
          // this.formulario.reset();
          // this.resetar();
        },
        (error: any) => alert('erro')
      );
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
  validarEmail(formControl: FormControl) {
    return this.verificaEmail.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null))
  }
}
