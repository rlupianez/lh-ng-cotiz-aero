import {sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild, state} from '@angular/animations';


export const pageAnimation = trigger('routeAnimation', [
  transition('* => *', [
    query(':enter .row', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [
        style({ opacity: 0 }), animate('0.8s ease-in-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);


export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('routeAnimation', [

        // route 'enter' transition
        transition('* => *', [
            // css styles at start of transition
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ opacity: 0 }), animate('0.8s ease-in-out', style({ opacity: 1 }))
                ], { optional: true }),
                query(':leave', [
                   style({ opacity: 1 }), animate('0.3s ease-in-out', style({ opacity: 0 }))
                ], { optional: true })
               /*query(':leave', [                 
                style({ transform: 'translateX(0%)' }),
                    animate('0.3s ease-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true })
                */
            ])
        ])
    ]);

export const slideInBounceAnimation = trigger('routeAnimation', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
    query(':enter', style({ transform: 'translateX(100%)' })),
    sequence([
      query(':leave', animateChild()), 
      group([
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', 
            style({ transform: 'translateX(-100%)' }))
        ]),
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', 
            style({ transform: 'translateX(0%)' })),
        ]),
      ]),
      query(':enter', animateChild()),
    ])
  ])
]);


export const slideInAnimation =
  trigger('routeAnimation', [
      /*transition('* => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(-100%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
              ], { optional: true }),
          ])
      ]),*/
      transition('* => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(100%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
              ], { optional: true }),
          ])
      ]),
      /*transition('* => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(100%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
              ], { optional: true }),
          ])
      ]),
      transition('* => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(-100%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
              ], { optional: true }),
          ])
      ])*/
  ]);

  export const slideInTopAnimation =
  trigger('slideIn', [
      transition('* => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
          group([
              query(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
              ], { optional: true }),
              query(':leave', [
                style({ opacity: 1 }), animate('.2s', style({ opacity: 0 }))
              ], { optional: true })
          ])
      ]),
      /*transition('* => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(100%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
              ], { optional: true }),
          ])
      ]),*/
  ]);



  export const cardAnimation =
  // Trigger animation cards array
  trigger('routeAnimation', [
    // Transition from any state to any state
    transition('* => *', [
      // Initially the all cards are not visible
      query('.mat-chip:enter', style({ opacity: 0 }), { optional: true }),

      // Each card will appear sequentially with the delay of 300ms
      query('.mat-chip:enter', stagger('300ms', [
        animate('.5s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
          style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))]), { optional: true }),

      // Cards will disappear sequentially with the delay of 300ms
      query('.mat-chip:leave', stagger('300ms', [
        animate('500ms ease-out', keyframes([
          style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
          style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
          style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
        ]))]), { optional: true })
    ]),
  ]);

  export const pageAnimations =
    trigger('routeAnimation', [
      transition(':enter', [
        query('*', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('4400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]);


    export function SkeletonfadeIn(){
      return [
          transition(':enter', [
              style({opacity: 0}),
              animate('500ms ease-in', style({opacity: 1}))
            ])
        ];
    }

    export function SkeletonfadeOut(){
      return [
          transition(':leave', [
              style({opacity: 1}),
              animate('500ms ease-in', style({opacity: 0}))
            ])
        ];
    }


    export function SlideInRight(){
      return [
        transition(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ])
      ];
    }

    export function SlideInLeft(){
      return [
        transition(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ])
      ];
    }


    export function SlideInLeftTransition(){
      return [
        state('out', style({
            'opacity': '0', 'visibility': 'hidden'
        })),
        transition(' out => in', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ])
      ]
    }

    export function SlideInOut(){
      return [
        state('in', style({
          transform: 'translate3d(0,0,0)', visibility: 'visible', position: 'relative'
        })),
        state('out', style({
          transform: 'translate3d(100%, 0, 0)', visibility: 'hidden', position: 'fixed'
        })),
        transition('in => out', animate('400ms ease-in-out')),
        transition('out => in', animate('400ms ease-in-out'))
        ]
    }

    export function rowsSlideAnimation() {
      return  [
        transition('void => *', [
          style({ height: '40px', opacity: '0', transform: 'translateX(-20%)' }),
          sequence([
            animate(".55s ease", style({ opacity: '.3', transform: 'translateX(0)' })),
            animate(".55s ease", style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ]
    }

